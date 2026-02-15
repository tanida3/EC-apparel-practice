'use client';

import { useState, useCallback } from 'react';

export type Toast = {
    id: string;
    message: string;
    type: 'success' | 'error';
};

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: "success" | "error") => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, message, type}]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    
    return { toasts, addToast, removeToast };
}