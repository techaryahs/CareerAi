import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";

const ActivityTracker = () => {
  // ✅ Call hooks at the top level of the component
  const { user } = useAuth();

  useEffect(() => {
    // Only set up the heartbeat if we have a user
    if (!user) return;
    
    const sendHeartbeat = async () => {
      try {
        const role = user.role || 'student';
        const userId = user._id;

        if (!userId) return;

        await axios.post(`${import.meta.env.VITE_API_URL}/api/activity/heartbeat`, {
          userId,
          role,
          name: user.name || user.fullName,
          email: user.email
        });
      } catch (error) {
        console.error("Heartbeat failed", error);
      }
    };

    // Send immediately on mount
    sendHeartbeat();

    // Then every 60 seconds
    const intervalId = setInterval(sendHeartbeat, 60000);

    // Cleanup interval on unmount or when user changes
    return () => clearInterval(intervalId);
    
  }, [user]); // ✅ Add user to dependency array to restart tracker if user logs in/out

  return null;
};

export default ActivityTracker;