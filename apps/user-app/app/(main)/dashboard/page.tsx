'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Button } from '@coderina-ams/ui/components/button';
import { Card } from '@coderina-ams/ui/components/card';
import { mockEvents } from '@/lib/events';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, TrendingUp, Award } from 'lucide-react';

export default function Dashboard() {
    // Mock user registrations
    const userRegistrations = [
        { eventId: '1', eventTitle: 'Web Development Workshop', date: '2026-02-28' },
        { eventId: '2', eventTitle: 'AI & Machine Learning Summit', date: '2026-03-15' },
        { eventId: '4', eventTitle: 'Digital Marketing Masterclass', date: '2026-02-10' },
    ];

    const registeredEvents = userRegistrations
        .map((reg) => mockEvents.find((e) => e.id === reg.eventId))
        .filter(Boolean);

    // Stats data
    const totalRegistrations = registeredEvents.length;
    const upcomingRegistrations = registeredEvents.filter((e) => e?.status === 'upcoming').length;
    const attendedEvents = registeredEvents.filter((e) => e?.status === 'past').length;

    // Chart data
    const monthlyRegistrations = [
        { month: 'Jan', registrations: 2 },
        { month: 'Feb', registrations: 5 },
        { month: 'Mar', registrations: 3 },
        { month: 'Apr', registrations: 0 },
        { month: 'May', registrations: 0 },
        { month: 'Jun', registrations: 0 },
    ];

    const eventTypeDistribution = [
        { name: 'Workshop', value: 2 },
        { name: 'Conference', value: 1 },
        { name: 'Webinar', value: 1 },
    ];

    const COLORS = ['#3b82f6', '#ef4444', '#10b981'];

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
                    <p className="mt-2 text-muted-foreground">Track your event registrations and manage your profile</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-4 mb-8">
                    <Card className="bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Registrations</p>
                                <p className="text-3xl font-bold text-foreground mt-2">{totalRegistrations}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-500" />
                        </div>
                    </Card>

                    <Card className="bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Upcoming Events</p>
                                <p className="text-3xl font-bold text-foreground mt-2">{upcomingRegistrations}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                    </Card>

                    <Card className="bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Attended Events</p>
                                <p className="text-3xl font-bold text-foreground mt-2">{attendedEvents}</p>
                            </div>
                            <Award className="h-8 w-8 text-purple-500" />
                        </div>
                    </Card>

                    <Card className="bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Attendees</p>
                                <p className="text-3xl font-bold text-foreground mt-2">
                                    {registeredEvents.reduce((sum, e) => sum + (e?.registered || 0), 0)}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-orange-500" />
                        </div>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid gap-8 md:grid-cols-2 mb-8">
                    <Card className="bg-card p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Registrations Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyRegistrations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="registrations" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="bg-card p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Event Type Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={eventTypeDistribution} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                                    {eventTypeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* Registered Events */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-foreground">My Registered Events</h2>
                        <Link href="/">
                            <Button variant="outline">Browse More Events</Button>
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {registeredEvents.map((event) => (
                            <Card key={event?.id} className="bg-card p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold text-foreground">{event?.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{event?.category}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${event?.status === 'upcoming'
                                            ? 'bg-blue-100 text-blue-700'
                                            : event?.status === 'ongoing'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {/* {event?.status.charAt(0).toUpperCase() + event?.status.slice(1)} */}
                                        {event?.status}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                    <p>📅 {event?.date}</p>
                                    <p>⏰ {event?.time}</p>
                                    <p>📍 {event?.location}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Link href={`/events/${event?.id}`} className="flex-1">
                                        <Button variant="outline" className="w-full bg-transparent">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button className="flex-1">Add to Calendar</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {registeredEvents.length === 0 && (
                        <Card className="bg-card p-12 text-center">
                            <p className="text-muted-foreground mb-4">You haven't registered for any events yet</p>
                            <Link href="/">
                                <Button>Browse Events</Button>
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
