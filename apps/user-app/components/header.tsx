'use client';

import { Button } from '@coderina-ams/ui/components/button';
import { Logo } from '@coderina-ams/ui/components/logo';
import Link from 'next/link';

export function Header() {
    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* <Link href="/" className="text-2xl font-bold text-foreground">
                        EventHub
                    </Link> */}
                    <Logo />
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        <Link href="/integrations">
                            <Button variant="ghost">Integrations</Button>
                        </Link>
                        <Link href="/auth/sign-in">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link href="/auth/sign-up">
                            <Button>Create Account</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
