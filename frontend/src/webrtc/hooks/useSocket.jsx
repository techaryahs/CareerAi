import { useEffect, useState, useCallback } from "react";
import {
  getSocket,
  connectSocket,
  disconnectSocket,
  getSocketUrl,
} from "../utils/socket";

/**
 * Custom hook for Socket.IO connection management
 * Handles connection state and provides emit/on/off methods
 */
export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    const handleConnect = () => {
      console.log("🟢 [Socket] Connected Event Fired. ID:", socketInstance.id);
      setConnected(true);
      setError(null);
    };

    const handleDisconnect = () => {
      console.log("🟠 [Socket] Disconnected Event Fired");
      setConnected(false);
    };

    const handleConnectError = (error) => {
      console.error("🔴 [Socket] Connection Error Event:", error.message);
      setConnected(false);
      setError(error.message);
    };

    // Attach event listeners
    console.log("🔌 [Socket] Attaching listeners to instance");
    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleConnectError);

    // Set initial connection state
    if (socketInstance.connected) {
      setConnected(true);
    }

    // Fallback polling for connection state in case events are missed
    // during transport upgrades or rapid mount/unmount
    const syncInterval = setInterval(() => {
      setConnected(socketInstance.connected);
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(syncInterval);
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
      socketInstance.off("connect_error", handleConnectError);
    };
  }, []);

  // Emit event to server
  const emit = useCallback(
    (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    [socket]
  );

  // Subscribe to event
  const on = useCallback(
    (event, handler) => {
      if (socket) {
        socket.on(event, handler);
      }
    },
    [socket]
  );

  // Unsubscribe from event
  const off = useCallback(
    (event, handler) => {
      if (socket) {
        socket.off(event, handler);
      }
    },
    [socket]
  );

  // Manual connect function that avoids the race condition
  const connect = useCallback(() => {
    const socketInstance = getSocket();
    if (!socketInstance.connected) {
      console.log("🔌 Attempting to connect...");
      socketInstance.connect();
    } else {
      setConnected(true);
    }
  }, []);

  return {
    socket,
    connected,
    error,
    url: getSocketUrl(),
    transport: socket?.io?.engine?.transport?.name || "unknown",
    emit,
    on,
    off,
    connect,
    disconnect: disconnectSocket,
  };
};
