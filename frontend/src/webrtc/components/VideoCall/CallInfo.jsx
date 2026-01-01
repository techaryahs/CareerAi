/**
 * CallInfo Component
 * Displays meeting ID with copy functionality in top bar
 */
const CallInfo = ({ meetingId, onCopyMeetingId }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-4 shadow-lg">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">Meeting ID:</span>
                <span className="text-white/90 font-mono tracking-wider text-sm">{meetingId}</span>
                <button
                    onClick={onCopyMeetingId}
                    className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copy meeting ID"
                >
                    <svg className="w-4 h-4 text-white/70 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CallInfo;
