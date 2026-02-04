'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Button } from '@coderina-ams/ui/components/button';
import { Card } from '@coderina-ams/ui/components/card';
import { Check, Settings } from 'lucide-react';

interface Integration {
    id: string;
    name: string;
    description: string;
    icon: string;
    connected: boolean;
    color: string;
}

export default function Integrations() {
    const [integrations, setIntegrations] = useState<Integration[]>([
        {
            id: 'google-calendar',
            name: 'Google Calendar',
            description: 'Sync events to your Google Calendar. Receive automatic reminders for registered events.',
            icon: '📅',
            connected: false,
            color: 'bg-blue-50 border-blue-200',
        },
        {
            id: 'outlook',
            name: 'Outlook Calendar',
            description: 'Integrate with Microsoft Outlook. Get event notifications and sync your schedule.',
            icon: '📨',
            connected: false,
            color: 'bg-cyan-50 border-cyan-200',
        },
        {
            id: 'apple-calendar',
            name: 'Apple Calendar',
            description: 'Add events to your Apple Calendar on all your devices.',
            icon: '🍎',
            connected: false,
            color: 'bg-gray-50 border-gray-200',
        },
        {
            id: 'slack',
            name: 'Slack Notifications',
            description: 'Get event reminders and updates sent directly to your Slack workspace.',
            icon: '💬',
            connected: false,
            color: 'bg-purple-50 border-purple-200',
        },
        {
            id: 'email',
            name: 'Email Notifications',
            description: 'Receive email reminders for upcoming events and important updates.',
            icon: '✉️',
            connected: false,
            color: 'bg-orange-50 border-orange-200',
        },
        {
            id: 'webhook',
            name: 'Webhook Integration',
            description: 'Connect your custom applications via webhooks for real-time event data.',
            icon: '🔌',
            connected: false,
            color: 'bg-green-50 border-green-200',
        },
    ]);

    const toggleConnection = (id: string) => {
        setIntegrations(integrations.map((int) => (int.id === id ? { ...int, connected: !int.connected } : int)));
    };

    const connectedCount = integrations.filter((i) => i.connected).length;

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
                    <p className="mt-2 text-muted-foreground">Connect EventHub with your favorite tools to get event reminders and notifications</p>
                </div>

                {/* Connection Status */}
                <Card className="bg-card p-6 mb-8 border border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-foreground">Connection Status</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {connectedCount} of {integrations.length} integrations connected
                            </p>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">
                            {Math.round((connectedCount / integrations.length) * 100)}%
                        </div>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(connectedCount / integrations.length) * 100}%` }} />
                    </div>
                </Card>

                {/* Integration Categories
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Calendar Sync</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {integrations
                            .slice(0, 3)
                            .map((integration) => (
                                <Card
                                    key={integration.id}
                                    className={`p-6 border transition-all cursor-pointer ${integration.connected ? 'bg-green-50 border-green-200' : integration.color
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <span className="text-3xl">{integration.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{integration.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                                            </div>
                                        </div>
                                        {integration.connected && <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />}
                                    </div>

                                    <Button
                                        onClick={() => toggleConnection(integration.id)}
                                        className="w-full"
                                        variant={integration.connected ? 'outline' : 'default'}
                                    >
                                        {integration.connected ? 'Disconnect' : 'Connect'}
                                    </Button>

                                    {integration.connected && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <Settings className="h-4 w-4 text-muted-foreground" />
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                Configure Settings
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Notification Services</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {integrations
                            .slice(3, 5)
                            .map((integration) => (
                                <Card
                                    key={integration.id}
                                    className={`p-6 border transition-all cursor-pointer ${integration.connected ? 'bg-green-50 border-green-200' : integration.color
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <span className="text-3xl">{integration.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{integration.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                                            </div>
                                        </div>
                                        {integration.connected && <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />}
                                    </div>

                                    <Button
                                        onClick={() => toggleConnection(integration.id)}
                                        className="w-full"
                                        variant={integration.connected ? 'outline' : 'default'}
                                    >
                                        {integration.connected ? 'Disconnect' : 'Connect'}
                                    </Button>

                                    {integration.connected && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <Settings className="h-4 w-4 text-muted-foreground" />
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                Configure Settings
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            ))}
                    </div>
                </div>

           
                <div>
                    <h2 className="text-lg font-semibold text-foreground mb-4">Developer Tools</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {integrations
                            .slice(5)
                            .map((integration) => (
                                <Card
                                    key={integration.id}
                                    className={`p-6 border transition-all cursor-pointer ${integration.connected ? 'bg-green-50 border-green-200' : integration.color
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <span className="text-3xl">{integration.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{integration.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                                            </div>
                                        </div>
                                        {integration.connected && <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />}
                                    </div>

                                    <Button
                                        onClick={() => toggleConnection(integration.id)}
                                        className="w-full"
                                        variant={integration.connected ? 'outline' : 'default'}
                                    >
                                        {integration.connected ? 'Disconnect' : 'Connect'}
                                    </Button>

                                    {integration.connected && (
                                        <div className="mt-3 flex items-center gap-2">
                                            <Settings className="h-4 w-4 text-muted-foreground" />
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                Configure Settings
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            ))}
                    </div>
                </div> */}
            </div>
        </main>
    );
}
