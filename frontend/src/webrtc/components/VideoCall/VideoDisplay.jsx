import { useEffect, useRef } from "react";

/**
 * VideoDisplay Component
 * Displays video stream with participant name and status indicators
 */
const VideoDisplay = ({
  stream,
  name,
  isMain = false,
  cameraOff = false,
  isMuted = false,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const width = isMain ? "w-full" : "w-64";
  const height = isMain ? "h-full" : "h-48";

  return (
    <div
      className={`relative ${width} ${height} bg-[#1a1a1a] rounded-2xl overflow-hidden group border border-white/5`}
    >
      {!cameraOff && stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={!isMain}
          className="w-full h-full object-cover scale-x-[-1]" // Mirror for self view usually, but we'll keep it standard for remote
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#2d2d2d]">
          <div className="text-center">
            <div className="w-20 h-20 bg-linear-to-tr from-[#3b82f6] to-[#1e40af] rounded-full flex items-center justify-center mx-auto mb-3 shadow-2xl ring-4 ring-white/5 transition-transform group-hover:scale-110 duration-500">
              <span className="text-3xl font-bold text-white tracking-widest">
                {name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
              {isMain ? "Video Off" : name}
            </p>
          </div>
        </div>
      )}

      {/* Status indicators */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
          <span className="text-white text-xs font-bold tracking-wide">
            {name || "Participant"}
          </span>
          {isMuted && (
            <div className="bg-red-500/20 p-1 rounded">
              <svg
                className="w-3 h-3 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
            </div>
          )}
        </div>

        {!isMuted && (
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        )}
      </div>
    </div>
  );
};

export default VideoDisplay;
