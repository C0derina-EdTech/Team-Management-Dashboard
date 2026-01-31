import { AnalyticsSection } from '@/components/AnalyticsSection';
import { SourcesTable } from '@/components/SourcesTable';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (

    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here are your Events overview.</p>
      </div>
      <AnalyticsSection />
      <SourcesTable />
    </div>
  );
}
