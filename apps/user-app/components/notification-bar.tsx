'use client';

import { useState, useEffect } from 'react';
import { Button } from '@coderina-ams/ui/components/button';
import { X } from 'lucide-react';

interface Notification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

export function NotificationBar() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Simulate receiving notifications
        const timer = setTimeout(() => {
            setNotifications([
                {
                    id: '1',
                    message: '📅 Reminder: Web Development Workshop starts in 2 days',
                    type: 'info',
                },
            ]);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const removeNotification = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 space-y-2 p-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`mx-auto max-w-7xl flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${notification.type === 'info'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : notification.type === 'success'
                            ? 'bg-green-50 text-green-900 border border-green-200'
                            : notification.type === 'warning'
                                ? 'bg-yellow-50 text-yellow-900 border border-yellow-200'
                                : 'bg-red-50 text-red-900 border border-red-200'
                        }`}
                >
                    <span>{notification.message}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="ml-2 h-6 w-6 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
