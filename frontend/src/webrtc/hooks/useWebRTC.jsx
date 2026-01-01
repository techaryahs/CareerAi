import { useState, useCallback, useRef, useEffect } from "react";
import { ICE_SERVERS } from "../utils/constants";

/**
 * Custom hook for managing WebRTC peer connections
 * Handles offer/answer exchange, ICE candidates, and remote streams
 */
export const useWebRTC = (socket, localStream) => {
  const [remoteStreams, setRemoteStreams] = useState(new Map());
  const [participants, setParticipants] = useState([]);
  const peerConnections = useRef(new Map());

  // Create peer connection for a participant
  const createPeerConnection = useCallback(
    (participantId) => {
      try {
        const peerConnection = new RTCPeerConnection({
          iceServers: ICE_SERVERS,
        });

        // Add local tracks to peer connection
        if (localStream) {
          localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
          });
          console.log(
            `✅ Added local tracks to peer connection for ${participantId}`
          );
        }

        // Handle ICE candidate
        peerConnection.onicecandidate = (event) => {
          if (event.candidate && socket) {
            socket.emit("ice-candidate", {
              toParticipantId: participantId,
              candidate: event.candidate,
            });
          }
        };

        // Handle remote stream
        peerConnection.ontrack = (event) => {
          console.log("📡 Received remote track from:", participantId);
          const [remoteStream] = event.streams;
          setRemoteStreams((prev) => {
            const newMap = new Map(prev);
            newMap.set(participantId, remoteStream);
            return newMap;
          });
        };

        // Handle connection state changes
        peerConnection.onconnectionstatechange = () => {
          console.log(
            `🔗 Connection state with ${participantId}:`,
            peerConnection.connectionState
          );

          if (
            peerConnection.connectionState === "disconnected" ||
            peerConnection.connectionState === "failed" ||
            peerConnection.connectionState === "closed"
          ) {
            setRemoteStreams((prev) => {
              const newMap = new Map(prev);
              newMap.delete(participantId);
              return newMap;
            });
          }
        };

        peerConnections.current.set(participantId, peerConnection);
        return peerConnection;
      } catch (error) {
        console.error("❌ Error creating peer connection:", error);
        return null;
      }
    },
    [socket, localStream]
  );

  // Create and send offer
  const createOffer = useCallback(
    async (participantId) => {
      try {
        let peerConnection = peerConnections.current.get(participantId);

        if (!peerConnection) {
          peerConnection = createPeerConnection(participantId);
        }

        if (!peerConnection) return;

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        if (socket) {
          socket.emit("offer", {
            toParticipantId: participantId,
            offer: offer,
          });
          console.log(`📤 Sent offer to ${participantId}`);
        }
      } catch (error) {
        console.error("❌ Error creating offer:", error);
      }
    },
    [socket, createPeerConnection]
  );

  // Handle received offer
  const handleOffer = useCallback(
    async ({ fromParticipantId, offer }) => {
      try {
        let peerConnection = peerConnections.current.get(fromParticipantId);

        if (!peerConnection) {
          peerConnection = createPeerConnection(fromParticipantId);
        }

        if (!peerConnection) return;

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        if (socket) {
          socket.emit("answer", {
            toParticipantId: fromParticipantId,
            answer: answer,
          });
          console.log(`📤 Sent answer to ${fromParticipantId}`);
        }
      } catch (error) {
        console.error("❌ Error handling offer:", error);
      }
    },
    [socket, createPeerConnection]
  );

  // Handle received answer
  const handleAnswer = useCallback(async ({ fromParticipantId, answer }) => {
    try {
      const peerConnection = peerConnections.current.get(fromParticipantId);

      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        console.log(`✅ Set remote description from ${fromParticipantId}`);
      }
    } catch (error) {
      console.error("❌ Error handling answer:", error);
    }
  }, []);

  // Handle received ICE candidate
  const handleIceCandidate = useCallback(
    async ({ fromParticipantId, candidate }) => {
      try {
        const peerConnection = peerConnections.current.get(fromParticipantId);

        if (peerConnection) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          console.log(`✅ Added ICE candidate from ${fromParticipantId}`);
        }
      } catch (error) {
        console.error("❌ Error handling ICE candidate:", error);
      }
    },
    []
  );

  // Close peer connection
  const closePeerConnection = useCallback((participantId) => {
    const peerConnection = peerConnections.current.get(participantId);

    if (peerConnection) {
      peerConnection.close();
      peerConnections.current.delete(participantId);
      console.log(`🔌 Closed peer connection with ${participantId}`);
    }

    setRemoteStreams((prev) => {
      const newMap = new Map(prev);
      newMap.delete(participantId);
      return newMap;
    });
  }, []);

  // Close all peer connections
  const closeAllPeerConnections = useCallback(() => {
    peerConnections.current.forEach((peerConnection, participantId) => {
      peerConnection.close();
      console.log(`🔌 Closed peer connection with ${participantId}`);
    });
    peerConnections.current.clear();
    setRemoteStreams(new Map());
  }, []);

  // Update tracks if localStream changes after connection is established
  useEffect(() => {
    if (!localStream) return;

    peerConnections.current.forEach((pc, participantId) => {
      const senders = pc.getSenders();
      localStream.getTracks().forEach((track) => {
        const alreadyAdded = senders.some((s) => s.track?.id === track.id);
        if (!alreadyAdded) {
          pc.addTrack(track, localStream);
          console.log(
            `📡 [WebRTC] Dynamically added ${track.kind} track to ${participantId}`
          );
        }
      });
    });
  }, [localStream]);

  // Setup socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);

    socket.on("existing-participants", (existingParticipants) => {
      console.log("👥 Existing participants:", existingParticipants);
      setParticipants(existingParticipants);

      // Create offers to all existing participants
      existingParticipants.forEach((participant) => {
        if (participant.participantId) {
          setTimeout(() => {
            createOffer(participant.participantId);
          }, 1000);
        }
      });
    });

    socket.on("participant-joined", (participant) => {
      console.log("✅ Participant joined:", participant);
      setParticipants((prev) => [...prev, participant]);
    });

    socket.on("participant-left", ({ participantId }) => {
      console.log("⬅️ Participant left:", participantId);
      setParticipants((prev) =>
        prev.filter((p) => p.participantId !== participantId)
      );
      closePeerConnection(participantId);
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("existing-participants");
      socket.off("participant-joined");
      socket.off("participant-left");
    };
  }, [
    socket,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
    createOffer,
    closePeerConnection,
  ]);

  return {
    remoteStreams,
    participants,
    createOffer,
    closePeerConnection,
    closeAllPeerConnections,
  };
};
