import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing media devices (camera and microphone)
 * Handles getUserMedia, device enumeration, and stream controls
 */
export const useMediaDevices = () => {
    const [localStream, setLocalStream] = useState(null);
    const [devices, setDevices] = useState({
        audioInputs: [],
        videoInputs: [],
        audioOutputs: []
    });
    const [selectedDevices, setSelectedDevices] = useState({
        audioInput: null,
        videoInput: null
    });
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [error, setError] = useState(null);

    // Enumerate media devices
    const enumerateDevices = useCallback(async () => {
        try {
            const deviceList = await navigator.mediaDevices.enumerateDevices();

            const audioInputs = deviceList.filter(device => device.kind === 'audioinput');
            const videoInputs = deviceList.filter(device => device.kind === 'videoinput');
            const audioOutputs = deviceList.filter(device => device.kind === 'audiooutput');

            setDevices({
                audioInputs,
                videoInputs,
                audioOutputs
            });

            // Set default devices if not already set
            if (!selectedDevices.audioInput && audioInputs.length > 0) {
                setSelectedDevices(prev => ({ ...prev, audioInput: audioInputs[0].deviceId }));
            }
            if (!selectedDevices.videoInput && videoInputs.length > 0) {
                setSelectedDevices(prev => ({ ...prev, videoInput: videoInputs[0].deviceId }));
            }
        } catch (err) {
            console.error('❌ Error enumerating devices:', err);
            setError(err.message);
        }
    }, [selectedDevices.audioInput, selectedDevices.videoInput]);

    // Get user media stream
    const getUserMedia = useCallback(async (constraints = {}) => {
        try {
            const defaultConstraints = {
                audio: selectedDevices.audioInput
                    ? { deviceId: { exact: selectedDevices.audioInput } }
                    : true,
                video: selectedDevices.videoInput
                    ? {
                        deviceId: { exact: selectedDevices.videoInput },
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                    : {
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
            };

            const finalConstraints = { ...defaultConstraints, ...constraints };
            const stream = await navigator.mediaDevices.getUserMedia(finalConstraints);

            setLocalStream(stream);
            setError(null);
            console.log('✅ Media stream obtained');
            return stream;
        } catch (err) {
            console.error('❌ Error accessing media devices:', err);
            setError(err.message);
            throw err;
        }
    }, [selectedDevices]);

    // Toggle audio mute/unmute
    const toggleAudio = useCallback(() => {
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsAudioMuted(!audioTracks[0]?.enabled);
            console.log(`🎤 Audio ${audioTracks[0]?.enabled ? 'unmuted' : 'muted'}`);
        }
    }, [localStream]);

    // Toggle video on/off
    const toggleVideo = useCallback(() => {
        if (localStream) {
            const videoTracks = localStream.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!videoTracks[0]?.enabled);
            console.log(`📹 Video ${videoTracks[0]?.enabled ? 'on' : 'off'}`);
        }
    }, [localStream]);

    // Stop all tracks
    const stopStream = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
                console.log(`🛑 Stopped ${track.kind} track`);
            });
            setLocalStream(null);
            setIsAudioMuted(false);
            setIsVideoOff(false);
        }
    }, [localStream]);

    // Change device
    const changeDevice = useCallback(async (deviceType, deviceId) => {
        setSelectedDevices(prev => ({
            ...prev,
            [deviceType]: deviceId
        }));

        // Restart stream with new device
        if (localStream) {
            stopStream();
            await getUserMedia();
        }
    }, [localStream, stopStream, getUserMedia]);

    // Enumerate devices on mount and when devices change
    useEffect(() => {
        enumerateDevices();
        navigator.mediaDevices.addEventListener('devicechange', enumerateDevices);

        return () => {
            navigator.mediaDevices.removeEventListener('devicechange', enumerateDevices);
        };
    }, [enumerateDevices]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopStream();
        };
    }, [stopStream]);

    return {
        localStream,
        devices,
        selectedDevices,
        isAudioMuted,
        isVideoOff,
        error,
        getUserMedia,
        toggleAudio,
        toggleVideo,
        stopStream,
        changeDevice,
        enumerateDevices
    };
};
