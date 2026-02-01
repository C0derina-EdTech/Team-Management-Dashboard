import { Button } from '@coderina-ams/ui/components/button';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <p>Admin App</p>
      <Button>Admin</Button>
    </>
  );
}
