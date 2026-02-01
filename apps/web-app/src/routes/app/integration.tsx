import { Button } from '@coderina-ams/ui/components/button';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/integration')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Integrations</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔌</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Connect Your Tools</h3>
          <p className="text-gray-600 mb-6">Integrate with your favorite CRM, email, and marketing platforms</p>
          <Button className="px-6 py-3 bg-primary text-white rounded-lg  transition-colors">
            Browse Integrations
          </Button>
        </div>
      </div>
    </div>
  );
}
