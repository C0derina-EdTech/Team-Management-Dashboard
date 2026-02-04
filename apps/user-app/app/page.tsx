import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { EventSection } from '@/components/event-section';
import { mockEvents } from '@/lib/events';

export default function Home() {
  const upcomingEvents = mockEvents.filter((e) => e.status === 'upcoming');
  const ongoingEvents = mockEvents.filter((e) => e.status === 'ongoing');
  const pastEvents = mockEvents.filter((e) => e.status === 'past');

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EventSection
          title="Upcoming Events"
          description="Register now for exciting events coming soon"
          events={upcomingEvents}
        />
        <EventSection
          title="Ongoing Programs"
          description="Join these programs happening right now"
          events={ongoingEvents}
        />
        <EventSection
          title="Past Events"
          description="Check out what we've accomplished"
          events={pastEvents}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Coderina Edtech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
