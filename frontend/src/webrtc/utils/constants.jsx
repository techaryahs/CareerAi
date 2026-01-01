// WebRTC Constants and Configuration

// Server URL for WebRTC signaling
// For localhost development
const getBaseUrl = () => {
  const envUrl =
    import.meta.env.VITE_WEBRTC_SERVER_URL || import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;

  // Fallback to current domain but port 5001 for backend
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5001`;
};

export const SERVER_URL = getBaseUrl();

// ICE servers for WebRTC peer connection
export const ICE_SERVERS = [
  {
    urls: "stun:stun.l.google.com:19302",
  },
  {
    urls: "stun:stun1.l.google.com:19302",
  },
];

// App constants
export const APP_NAME = "CareerGenAI Video Call";
export const MAX_PARTICIPANTS = 10; // 1-to-1 calls only
export const DEFAULT_CALL_DURATION = 60; // minutes

// for localhost
