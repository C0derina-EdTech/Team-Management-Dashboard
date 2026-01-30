import LandingPage from '@muse/ui/components/landing-page';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({ component: App })

function App() {


  return (
    <LandingPage />
  );
}
