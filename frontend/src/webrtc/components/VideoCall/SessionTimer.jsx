import { useState, useEffect } from 'react';
import './SessionTimer.css'; // ✅ Import styles

/**
 * SessionTimer Component
 * Displays session timer and auto-ends call when session duration expires
 * Shows time remaining and warns when approaching end
 */
const SessionTimer = ({ sessionDuration = 60, onTimeExpired, participantCount }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        // Only start timer when both participants are present
        if (participantCount < 2) {
            setTimeRemaining(null);
            return;
        }

        // Initialize timer when participants join
        if (timeRemaining === null) {
            setTimeRemaining(sessionDuration * 60); // Convert minutes to seconds
        }

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeExpired?.();
                    return 0;
                }

                // Show warning in last 5 minutes
                if (prev <= 300 && !isWarning) {
                    setIsWarning(true);
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [participantCount, sessionDuration, timeRemaining, onTimeExpired, isWarning]);

    if (timeRemaining === null) {
        return (
            <div className="session-timer waiting">
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Waiting for participant...</span>
            </div>
        );
    }

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className={`session-timer ${isWarning ? 'warning' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="timer-text">{displayTime}</span>
            {isWarning && <span className="warning-badge">Ending soon</span>}
        </div>
    );
};

export default SessionTimer;
