'use client';

import { Event } from '@/lib/events';
import { Button } from '@coderina-ams/ui/components/button';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';

export function EventCard({ event }: { event: Event }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
                <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                    <span className="inline-flex rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                        {event.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {event.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                </p>

                {/* Event Details */}
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" />
                        <span>{event.registered} / {event.capacity} registered</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-2">
                    <Link href={`/events/${event.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                            View Details
                        </Button>
                    </Link>
                    <Link href={`/register?eventId=${event.id}`} className="flex-1">
                        <Button className="w-full">
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
