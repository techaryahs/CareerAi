import { useState } from "react";
import VideoDisplay from "./VideoCall/VideoDisplay";
import ChatPanel from "./VideoCall/ChatPanel";
import ControlBar from "./VideoCall/ControlBar";
import TopLeftControls from "./VideoCall/TopLeftControls";
import CallInfo from "./VideoCall/CallInfo";
import SessionTimer from "./VideoCall/SessionTimer"; // ✅ Import SessionTimer
import { useWebRTCContext } from "../context/WebRTCContext";
import "./VideoCallRoom.css"; // ✅ Import responsive CSS

/**
 * VideoCallRoom Component
 * Main video call interface combining all components
 */
const VideoCallRoom = ({ sessionDuration = 60 }) => {
  // ✅ Accept sessionDuration prop
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    meetingId,
    participantName,
    connected,
    localStream,
    remoteStreams,
    participants,
    isAudioMuted,
    isVideoOff,
    toggleAudio,
    toggleVideo,
    leaveMeeting,
  } = useWebRTCContext();

  // ✅ Handle session time expired - auto end call
  const handleSessionExpired = () => {
    alert("Session time has ended. The call will now end.");
    leaveMeeting();
  };

  const handleToggleMute = () => {
    toggleAudio();
  };

  const handleToggleCamera = () => {
    toggleVideo();
  };

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end the call?")) {
      leaveMeeting();
    }
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleToggleParticipants = () => {
    alert(`${participants.length + 1} participant(s) in this call`);
  };

  const handleCopyMeetingId = () => {
    if (meetingId) {
      navigator.clipboard.writeText(meetingId);
      alert("Meeting ID copied to clipboard!");
    }
  };

  if (!connected) {
    return (
      <div className="h-screen w-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Connecting...</h2>
          <p className="text-white/70">
            Please wait while we connect you to the meeting
          </p>
        </div>
      </div>
    );
  }

  // Get remote participant (for 1-to-1 calls, show first participant)
  const remoteParticipant = participants[0];
  const remoteStream = remoteParticipant
    ? remoteStreams.get(remoteParticipant.participantId)
    : null;

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] flex overflow-hidden font-sans">
      {/* Main video area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Top Overlay - Zoom Style */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg pointer-events-auto border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium tracking-wide">
                REC
              </span>
              <div className="w-px h-4 bg-white/20 mx-1"></div>
              <SessionTimer
                sessionDuration={sessionDuration}
                onTimeExpired={handleSessionExpired}
                participantCount={participants.length + 1}
              />
            </div>
          </div>

          <div className="pointer-events-auto">
            <CallInfo
              meetingId={meetingId}
              onCopyMeetingId={handleCopyMeetingId}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative p-2 md:p-4 mt-16 mb-20 overflow-hidden">
          <div className="h-full w-full rounded-3xl overflow-hidden relative bg-[#242424] shadow-2xl border border-white/5">
            {remoteParticipant ? (
              <VideoDisplay
                stream={remoteStream}
                name={remoteParticipant.participantName}
                isMain
                cameraOff={!remoteStream}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#1a1a1a] to-[#2d2d2d]">
                <div className="text-center max-w-md p-8">
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-white/10">
                    <svg
                      className="w-16 h-16 text-white/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl font-semibold mb-3">
                    Connecting with Counselor...
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    The meeting will start as soon as the other participant
                    joins. Please ensure your camera and microphone are ready.
                  </p>
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <p className="text-white/60 text-xs mb-1 uppercase tracking-widest font-bold">
                      Meeting ID
                    </p>
                    <p className="text-blue-400 font-mono text-lg">
                      {meetingId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Self view - Zoom floating look */}
            <div className="absolute bottom-6 right-6 w-48 md:w-64 aspect-video shadow-2xl rounded-2xl overflow-hidden border-2 border-white/20 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 z-30">
              <VideoDisplay
                stream={localStream}
                name={participantName}
                cameraOff={isVideoOff}
                isMuted={isAudioMuted}
              />
              <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-medium">
                You (Me)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Always dark */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#1a1a1a] border-t border-white/5 flex items-center justify-center px-6 z-40">
          <ControlBar
            isMuted={isAudioMuted}
            isCameraOn={!isVideoOff}
            onToggleMute={handleToggleMute}
            onToggleCamera={handleToggleCamera}
            onEndCall={handleEndCall}
            onToggleChat={handleToggleChat}
            onToggleParticipants={handleToggleParticipants}
            chatOpen={isChatOpen}
          />

          {/* View Options Toggle (Placeholder for more zoom feel) */}
          <div className="hidden md:flex absolute right-8 gap-4">
            <button className="text-white/60 hover:text-white transition-colors flex flex-col items-center gap-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                View
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel - Zoom style */}
      <div
        className={`transition-all duration-500 ease-in-out h-full shrink-0 bg-[#242424] border-l border-white/10 shadow-2xl ${
          isChatOpen ? "w-80 md:w-96" : "w-0 overflow-hidden"
        }`}
      >
        <div className="h-full">
          <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default VideoCallRoom;
