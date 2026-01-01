const { Server } = require("socket.io");

const setupWebRTCSignaling = (server) => {
    console.log("🚀 Initializing WebRTC Signaling Server...");
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const meetings = new Map();
    const participants = new Map();
    const activeCalls = new Map();

    // Log connection errors
    io.engine.on("connection_error", (err) => {
        console.log("❌ Socket Engine Error:", {
            code: err.code,
            message: err.message,
            context: err.context
        });
    });

    io.on('connection', (socket) => {
        console.log('✅ Client connected to signaling server:', socket.id);

        socket.on('start-call', ({ sessionId, meetingId, hostName, duration }) => {
            console.log(`📞 Host ${hostName} started call for session ${sessionId}`);
            const now = new Date();
            const endTime = new Date(now.getTime() + (duration || 30) * 60000);
            activeCalls.set(sessionId, {
                meetingId,
                hostName,
                startedAt: now.toISOString(),
                scheduledEndTime: endTime.toISOString(),
                duration: duration || 30,
                status: 'active'
            });
            io.emit('call-started', { sessionId, meetingId, hostName });
            socket.emit('call-start-confirmed', { sessionId, meetingId });
        });

        socket.on('check-call-status', ({ sessionId }) => {
            const callInfo = activeCalls.get(sessionId);
            socket.emit('call-status-response', {
                sessionId,
                isActive: !!callInfo,
                callInfo: callInfo || null
            });
        });

        socket.on('end-call', ({ sessionId }) => {
            console.log(`📞 Call ended for session ${sessionId}`);
            activeCalls.delete(sessionId);
            io.emit('call-ended', { sessionId });
        });

        socket.on('join-meeting', ({ meetingId, participantId, participantName, isHost, sessionId }) => {
            console.log(`\n👤 [Meeting] ${participantName} joining ${meetingId} (Session: ${sessionId}, Host: ${isHost})`);
            socket.join(meetingId);
            participants.set(socket.id, {
                socketId: socket.id,
                participantId,
                participantName,
                meetingId,
                isHost,
                isAudioMuted: false,
                isVideoOff: false,
                sessionId: sessionId || null,
            });

            if (!meetings.has(meetingId)) {
                meetings.set(meetingId, new Set());
            }
            meetings.get(meetingId).add(socket.id);

            socket.to(meetingId).emit('participant-joined', {
                participantId,
                participantName,
                isHost
            });

            const currentParticipants = Array.from(meetings.get(meetingId))
                .map(sid => participants.get(sid))
                .filter(p => p && p.socketId !== socket.id);

            if (isHost && currentParticipants.length > 0) {
                socket.to(meetingId).emit('host-rejoined', {
                    hostName: participantName,
                    meetingId: meetingId,
                    sessionId: sessionId
                });
            }

            socket.emit('existing-participants', currentParticipants);
        });

        socket.on('offer', ({ meetingId, toParticipantId, offer }) => {
            const sender = participants.get(socket.id);
            const targetSocketId = Array.from(participants.entries())
                .find(([_, p]) => p.participantId === toParticipantId)?.[0];

            if (targetSocketId) {
                io.to(targetSocketId).emit('offer', {
                    fromParticipantId: sender.participantId,
                    fromParticipantName: sender.participantName,
                    offer
                });
            }
        });

        socket.on('answer', ({ meetingId, toParticipantId, answer }) => {
            const sender = participants.get(socket.id);
            const targetSocketId = Array.from(participants.entries())
                .find(([_, p]) => p.participantId === toParticipantId)?.[0];

            if (targetSocketId) {
                io.to(targetSocketId).emit('answer', {
                    fromParticipantId: sender.participantId,
                    answer
                });
            }
        });

        socket.on('ice-candidate', ({ meetingId, toParticipantId, candidate }) => {
            const sender = participants.get(socket.id);
            const targetSocketId = Array.from(participants.entries())
                .find(([_, p]) => p.participantId === toParticipantId)?.[0];

            if (targetSocketId) {
                io.to(targetSocketId).emit('ice-candidate', {
                    fromParticipantId: sender.participantId,
                    candidate
                });
            }
        });

        socket.on('chat-message', ({ meetingId, message }) => {
            socket.to(meetingId).emit('chat-message', message);
        });

        socket.on('update-participant-state', ({ meetingId, participantId, isAudioMuted, isVideoOff }) => {
            const participant = participants.get(socket.id);
            if (participant && participant.participantId === participantId) {
                if (isAudioMuted !== undefined) participant.isAudioMuted = isAudioMuted;
                if (isVideoOff !== undefined) participant.isVideoOff = isVideoOff;
                io.to(meetingId).emit('participant-state-changed', {
                    participantId,
                    participantName: participant.participantName,
                    isAudioMuted: participant.isAudioMuted,
                    isVideoOff: participant.isVideoOff,
                });
            }
        });

        socket.on('leave-meeting', ({ meetingId, participantId }) => {
            handleParticipantLeave(socket, meetingId, participantId, io, meetings, participants);
        });

        socket.on('disconnect', () => {
            const participant = participants.get(socket.id);
            if (participant) {
                handleParticipantLeave(socket, participant.meetingId, participant.participantId, io, meetings, participants);
            }
        });
    });

    const handleParticipantLeave = (socket, meetingId, participantId, io, meetings, participants) => {
        const participant = participants.get(socket.id);
        if (participant) {
            console.log(`${participant.participantName} left meeting ${meetingId}`);
            socket.to(meetingId).emit('participant-left', {
                participantId: participant.participantId,
                participantName: participant.participantName
            });
            if (participant.isHost) {
                socket.to(meetingId).emit('host-left', {
                    hostName: participant.participantName,
                    meetingId: meetingId,
                    sessionId: participant.sessionId
                });
            }
            socket.leave(meetingId);
            participants.delete(socket.id);
            if (meetings.has(meetingId)) {
                meetings.get(meetingId).delete(socket.id);
                if (meetings.get(meetingId).size === 0) {
                    meetings.delete(meetingId);
                }
            }
        }
    };
};

module.exports = setupWebRTCSignaling;
