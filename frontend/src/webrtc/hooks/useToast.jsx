import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for toast notifications
 * Simple toast system for video call feedback
 */
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback(({ title, description, duration = 3000, variant = 'default' }) => {
        const id = Date.now() + Math.random();
        const newToast = { id, title, description, variant };

        setToasts(prev => [...prev, newToast]);

        // Auto-remove after duration
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);

        return id;
    }, []);

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return { toast, toasts, dismiss };
};
