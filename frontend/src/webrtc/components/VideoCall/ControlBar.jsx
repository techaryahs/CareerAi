/**
 * ControlBar Component
 * Bottom control bar with audio, video, end call, chat, and participants buttons
 */
const ControlBar = ({
  isMuted,
  isCameraOn,
  onToggleMute,
  onToggleCamera,
  onEndCall,
  onToggleChat,
  onToggleParticipants,
  chatOpen,
}) => {
  return (
    <div className="bg-[#242424] border border-white/10 rounded-2xl px-8 py-3 flex items-center justify-center gap-6 shadow-2xl">
      {/* Microphone */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={onToggleMute}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isMuted
              ? "bg-red-500/20 text-red-500 ring-2 ring-red-500/50 hover:bg-red-500/30"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          )}
        </button>
        <span
          className={`text-[10px] font-bold uppercase tracking-tight ${
            isMuted ? "text-red-500" : "text-white/60"
          }`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </span>
      </div>

      {/* Camera */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={onToggleCamera}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            !isCameraOn
              ? "bg-red-500/20 text-red-500 ring-2 ring-red-500/50 hover:bg-red-500/30"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          {isCameraOn ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          )}
        </button>
        <span
          className={`text-[10px] font-bold uppercase tracking-tight ${
            !isCameraOn ? "text-red-500" : "text-white/60"
          }`}
        >
          {isCameraOn ? "Stop Video" : "Start Video"}
        </span>
      </div>

      {/* Separator */}
      <div className="w-px h-10 bg-white/10 mx-2"></div>

      {/* Chat */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={onToggleChat}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            chatOpen
              ? "bg-blue-600/20 text-blue-400 ring-2 ring-blue-500/50 hover:bg-blue-600/30"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">
          Chat
        </span>
      </div>

      {/* Participants */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={onToggleParticipants}
          className="w-12 h-12 rounded-xl bg-white/5 text-white hover:bg-white/10 flex items-center justify-center transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">
          Participants
        </span>
      </div>

      {/* Separator */}
      <div className="w-px h-10 bg-white/10 mx-2"></div>

      {/* End Call */}
      <button
        onClick={onEndCall}
        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-lg font-bold text-sm tracking-wide uppercase"
      >
        End Meeting
      </button>
    </div>
  );
};

export default ControlBar;
