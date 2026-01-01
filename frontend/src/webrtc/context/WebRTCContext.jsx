import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useSocket } from "../hooks/useSocket";
import { useMediaDevices } from "../hooks/useMediaDevices";
import { useWebRTC } from "../hooks/useWebRTC";
import { connectSocket, disconnectSocket } from "../utils/socket";

const WebRTCContext = createContext(null);

/**
 * WebRTC Context Provider
 * Manages global WebRTC state for the entire application
 */
export const WebRTCProvider = ({ children }) => {
  const [meetingState, setMeetingState] = useState({
    inMeeting: false,
    meetingId: null,
    participantName: null,
    isHost: false,
  });

  const { socket, connected, error, url, transport, emit, on, off } =
    useSocket();
  const {
    localStream,
    isAudioMuted,
    isVideoOff,
    toggleAudio,
    toggleVideo,
    getUserMedia,
    stopStream,
  } = useMediaDevices();

  const { remoteStreams, participants } = useWebRTC(socket, localStream);

  // Generate stable participant ID
  const participantId = useMemo(() => {
    if (!meetingState.participantName) return null;
    return `${meetingState.participantName.replace(/\s+/g, "-")}-${Date.now()}`;
  }, [meetingState.meetingId, meetingState.participantName]);

  const joinAttempted = useRef(false);

  // Ensure socket is connected whenever we are in the video call flow
  useEffect(() => {
    connectSocket();
  }, []);

  useEffect(() => {
    const initAndJoin = async () => {
      if (
        meetingState.inMeeting &&
        connected &&
        !joinAttempted.current &&
        participantId
      ) {
        try {
          joinAttempted.current = true;
          // 1. Get user media BEFORE joining
          let stream = localStream;
          if (!stream) {
            console.log("🎥 [WebRTC] Requesting local stream...");
            stream = await getUserMedia();
          }

          if (stream && socket) {
            console.log(
              "🎬 [WebRTC] Joining meeting with active stream:",
              meetingState.meetingId
            );
            emit("join-meeting", {
              meetingId: meetingState.meetingId,
              participantId,
              participantName: meetingState.participantName,
              isHost: meetingState.isHost,
              sessionId: meetingState.meetingId,
            });
          }
        } catch (error) {
          console.error("❌ [WebRTC] Setup failed:", error);
          joinAttempted.current = false;
          const redirectPath = meetingState.isHost
            ? "/consultant-dashboard"
            : "/history";
          alert(`Could not start video: ${error.message}`);
          setMeetingState((prev) => ({ ...prev, inMeeting: false }));
        }
      }
    };

    initAndJoin();
  }, [meetingState.inMeeting, connected, participantId]);

  // Update participant state when audio/video changes
  useEffect(() => {
    if (socket && meetingState.inMeeting && participantId) {
      emit("update-participant-state", {
        meetingId: meetingState.meetingId,
        participantId,
        isAudioMuted,
        isVideoOff,
      });
    }
  }, [isAudioMuted, isVideoOff]);

  // Start meeting (create new session)
  const startMeeting = useCallback((name, bookingId) => {
    const newMeetingId = bookingId || generateMeetingId();
    setMeetingState({
      inMeeting: true,
      meetingId: newMeetingId,
      participantName: name,
      isHost: true,
    });
  }, []);

  // Join existing meeting
  const joinMeeting = useCallback(
    (id, name, isHost = false) => {
      console.log("📞 Joining meeting:", id, name, "isHost:", isHost);

      setMeetingState({
        inMeeting: true,
        meetingId: id,
        participantName: name,
        isHost: isHost,
      });

      // ✅ Emit start-call event to notify other participants
      if (socket) {
        setTimeout(() => {
          socket.emit("start-call", {
            sessionId: id,
            meetingId: id,
            hostName: name,
            duration: 60, // 60 minutes default
          });
          console.log("✅ Emitted start-call event for session:", id);
        }, 1000);
      }
    },
    [socket]
  );

  // Leave meeting
  const leaveMeeting = useCallback(() => {
    if (socket && participantId) {
      emit("leave-meeting", {
        meetingId: meetingState.meetingId,
        participantId,
      });
    }
    stopStream();
    disconnectSocket();
    setMeetingState({
      inMeeting: false,
      meetingId: null,
      participantName: null,
      isHost: false,
    });
    joinAttempted.current = false;
    console.log("⬅️ Left meeting");
  }, [socket, participantId, meetingState.meetingId, emit, stopStream]);

  // Generate meeting ID
  const generateMeetingId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 12; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const value = {
    // Meeting state
    ...meetingState,
    connected,

    // Streams
    localStream,
    remoteStreams,
    participants,

    // Media controls
    isAudioMuted,
    isVideoOff,
    toggleAudio,
    toggleVideo,

    // Meeting actions
    startMeeting,
    joinMeeting,
    leaveMeeting,

    // Socket
    socket,
    connected,
    error,
    url,
    transport,
    emit,
    on,
    off,
    connect: connectSocket,
    disconnect: disconnectSocket,
  };

  return (
    <WebRTCContext.Provider value={value}>{children}</WebRTCContext.Provider>
  );
};

/**
 * Hook to use WebRTC context
 */
export const useWebRTCContext = () => {
  const context = useContext(WebRTCContext);
  if (!context) {
    throw new Error("useWebRTCContext must be used within WebRTCProvider");
  }
  return context;
};
