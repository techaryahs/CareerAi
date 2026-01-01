import { io } from "socket.io-client";
import { SERVER_URL } from "./constants";

let socket = null;
let currentUrl = null;

/**
 * Get or create socket instance
 * Singleton pattern to ensure only one socket connection
 */
export const getSocket = () => {
  if (!socket || currentUrl !== SERVER_URL) {
    if (socket) socket.disconnect();

    currentUrl = SERVER_URL;
    socket = io(SERVER_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 20,
      timeout: 20000,
    });

    // Socket connection event listeners
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
    });
  }
  return socket;
};

/**
 * Connect socket manually
 */
export const connectSocket = () => {
  if (socket && !socket.connected) {
    socket.connect();
  } else if (!socket) {
    getSocket().connect();
  }
};

/**
 * Disconnect and cleanup socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
export const getSocketUrl = () => currentUrl || SERVER_URL;
