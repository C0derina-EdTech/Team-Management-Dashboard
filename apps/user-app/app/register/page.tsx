"use client"
import { mockEvents } from '@coderina-ams/ui/lib/events';
import { Header } from '@/components/header';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { EventRegistrationForm } from '@coderina-ams/ui/components/forms/event-registration-form';

interface EventDetailsPageProps {
    params: Promise<{
        eventId: string;
    }>;
}

export default async function EventDetailsPage() {
    // const { eventId } = await params;
    // const event = mockEvents.find((e) => e.id === eventId);

    if (!event) {
        notFound();
    }

    // const capacityPercentage = (event.registered / event.capacity) * 100;
    // const spotsLeft = event.capacity - event.registered;

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/" className="mb-6 inline-flex items-center gap-2 text-primary hover:text-primary/80">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Events
                </Link>

                <EventRegistrationForm/>
            </div>

            {/* Footer */}
            <footer className="border-t border-border bg-card py-12 mt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-muted-foreground">
                        <p>&copy; 2026 EventHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
