import { Button } from "@coderina-ams/ui/components/button"
import { Logo } from "@coderina-ams/ui/components/logo"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Logo />
        <h1 className="text-2xl font-bold">Check In App</h1>
        <Button size="sm" asChild>
          <Link href="/auth/sign-in">Login</Link>
        </Button>
      </div>
    </div>
  )
}
