import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useWebRTCContext } from "../../webrtc/context/WebRTCContext";
import VideoCallRoom from "../../webrtc/components/VideoCallRoom";
import { useAuth } from "../../context/AuthContext";
/**
 * VideoCallPage Component
 * Page wrapper for video call sessions linked to counselor bookings
 */
const VideoCallPage = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    inMeeting,
    joinMeeting,
    leaveMeeting,
    connected,
    error,
    connect,
    url,
    transport,
  } = useWebRTCContext();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const { user } = useAuth();

  // Get booking details from location state
  const booking = location.state?.booking;

  useEffect(() => {
    // Ensure connection is attempted
    if (!connected) {
      connect();
    }

    if (!booking) {
      // If no booking data, redirect path
      const redirectPath =
        user?.role === "consultant" ? "/consultant-dashboard" : "/history";
      alert(
        "No booking information found. Please join from your booking history."
      );
      navigate(redirectPath);
      return;
    }

    // Auto-join meeting when component mounts and connected
    if (!inMeeting && !isJoining && !hasJoined && connected) {
      setIsJoining(true);
      try {
        const userName = user?.name || "User";

        const isHost = user?.role === "consultant";
        // Join meeting with booking ID as meeting ID
        joinMeeting(bookingId, userName, isHost);
        setHasJoined(true);
      } catch (error) {
        console.error("Error joining meeting:", error);
        alert("Failed to join video call. Please try again.");
        const redirectPath =
          user?.role === "consultant" ? "/consultant-dashboard" : "/history";
        navigate(redirectPath);
      } finally {
        setIsJoining(false);
      }
    }
  }, [
    booking,
    bookingId,
    connected,
    user,
    connect,
    inMeeting,
    isJoining,
    hasJoined,
    joinMeeting,
    navigate,
  ]);

  // Handle actual page exit
  useEffect(() => {
    return () => {
      console.log("🚪 Leaving meeting on page exit");
      leaveMeeting();
    };
  }, [leaveMeeting]);

  // ✅ Calculate session duration (default 60 minutes)
  const sessionDuration = 60;

  if (!booking) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading booking information...</p>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center max-w-md px-6">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            </div>
          </div>

          <h2 className="text-white text-2xl font-bold mb-3 tracking-tight">
            Connecting to server...
          </h2>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-8 border border-slate-700/50">
            <div className="flex flex-col gap-2 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Target Server:</span>
                <span className="text-blue-400 font-mono">{url}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Current Transport:</span>
                <span className="text-blue-400 font-mono capitalize">
                  {transport}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Socket Status:</span>
                <span
                  className={`font-mono ${
                    connected ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {connected ? "READY" : "WAITING_HANDSHAKE"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Initializing secure video connection for your session. This usually
            takes just a few seconds.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-red-400 text-xs font-mono mb-3 text-left">
                Connection Error: {error}
              </p>
              <button
                onClick={() => connect()}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors shadow-lg shadow-red-500/20"
              >
                Retry Connection
              </button>
            </div>
          )}

          {!error && (
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isJoining) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Joining video call...</p>
          <p className="text-gray-400 text-sm mt-2">
            Setting up your camera and microphone
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Booking Info Banner */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Session with:</span>{" "}
          {booking.consultantName || booking.userEmail}
        </p>
        <p className="text-xs text-gray-500">
          {booking.date} at {booking.time}
        </p>
      </div>

      {/* Video Call Room - ✅ Pass sessionDuration */}
      <VideoCallRoom sessionDuration={sessionDuration} />
    </div>
  );
};

export default VideoCallPage;
