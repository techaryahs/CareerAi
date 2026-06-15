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

    // Enumerate available devices
    const enumerateDevices = useCallback(async () => {
        try {
            if (
                !navigator.mediaDevices ||
                typeof navigator.mediaDevices.enumerateDevices !== 'function'
            ) {
                console.warn('⚠️ Media devices API not available');
                return;
            }

            const deviceList = await navigator.mediaDevices.enumerateDevices();

            const audioInputs = deviceList.filter(
                device => device.kind === 'audioinput'
            );

            const videoInputs = deviceList.filter(
                device => device.kind === 'videoinput'
            );

            const audioOutputs = deviceList.filter(
                device => device.kind === 'audiooutput'
            );

            setDevices({
                audioInputs,
                videoInputs,
                audioOutputs
            });

            if (!selectedDevices.audioInput && audioInputs.length > 0) {
                setSelectedDevices(prev => ({
                    ...prev,
                    audioInput: audioInputs[0].deviceId
                }));
            }

            if (!selectedDevices.videoInput && videoInputs.length > 0) {
                setSelectedDevices(prev => ({
                    ...prev,
                    videoInput: videoInputs[0].deviceId
                }));
            }
        } catch (err) {
            console.error('❌ Error enumerating devices:', err);
            setError(err?.message || 'Failed to enumerate devices');
        }
    }, [selectedDevices.audioInput, selectedDevices.videoInput]);

    // Get user media
    const getUserMedia = useCallback(
        async (constraints = {}) => {
            try {
                if (
                    !navigator.mediaDevices ||
                    typeof navigator.mediaDevices.getUserMedia !== 'function'
                ) {
                    throw new Error('getUserMedia not supported');
                }

                const defaultConstraints = {
                    audio: selectedDevices.audioInput
                        ? {
                              deviceId: {
                                  exact: selectedDevices.audioInput
                              }
                          }
                        : true,

                    video: selectedDevices.videoInput
                        ? {
                              deviceId: {
                                  exact: selectedDevices.videoInput
                              },
                              width: { ideal: 1280 },
                              height: { ideal: 720 }
                          }
                        : {
                              width: { ideal: 1280 },
                              height: { ideal: 720 }
                          }
                };

                const finalConstraints = {
                    ...defaultConstraints,
                    ...constraints
                };

                const stream =
                    await navigator.mediaDevices.getUserMedia(
                        finalConstraints
                    );

                setLocalStream(stream);
                setError(null);

                // console.log('✅ Media stream obtained');

                return stream;
            } catch (err) {
                // console.error(
                //     '❌ Error accessing media devices:',
                //     err
                // );

                setError(
                    err?.message || 'Failed to access media devices'
                );

                throw err;
            }
        },
        [selectedDevices]
    );

    // Toggle audio
    const toggleAudio = useCallback(() => {
        if (!localStream) return;

        const audioTracks = localStream.getAudioTracks();

        audioTracks.forEach(track => {
            track.enabled = !track.enabled;
        });

        const muted = !audioTracks[0]?.enabled;

        setIsAudioMuted(muted);

        // console.log(
        //     `🎤 Audio ${muted ? 'muted' : 'unmuted'}`
        // );
    }, [localStream]);

    // Toggle video
    const toggleVideo = useCallback(() => {
        if (!localStream) return;

        const videoTracks = localStream.getVideoTracks();

        videoTracks.forEach(track => {
            track.enabled = !track.enabled;
        });

        const videoOff = !videoTracks[0]?.enabled;

        setIsVideoOff(videoOff);

        // console.log(
        //     `📹 Video ${videoOff ? 'off' : 'on'}`
        // );
    }, [localStream]);

    // Stop stream
    const stopStream = useCallback(() => {
        if (!localStream) return;

        localStream.getTracks().forEach(track => {
            track.stop();
            // console.log(`🛑 Stopped ${track.kind} track`);
        });

        setLocalStream(null);
        setIsAudioMuted(false);
        setIsVideoOff(false);
    }, [localStream]);

    // Change device
    const changeDevice = useCallback(
        async (deviceType, deviceId) => {
            setSelectedDevices(prev => ({
                ...prev,
                [deviceType]: deviceId
            }));

            if (localStream) {
                stopStream();

                try {
                    await getUserMedia();
                } catch (err) {
                    console.error(err);
                }
            }
        },
        [localStream, stopStream, getUserMedia]
    );

    // Device enumeration and listeners
    useEffect(() => {
        enumerateDevices();

        if (
            navigator.mediaDevices &&
            typeof navigator.mediaDevices.addEventListener ===
                'function'
        ) {
            navigator.mediaDevices.addEventListener(
                'devicechange',
                enumerateDevices
            );
        }

        return () => {
            if (
                navigator.mediaDevices &&
                typeof navigator.mediaDevices.removeEventListener ===
                    'function'
            ) {
                navigator.mediaDevices.removeEventListener(
                    'devicechange',
                    enumerateDevices
                );
            }
        };
    }, [enumerateDevices]);

    // Cleanup
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