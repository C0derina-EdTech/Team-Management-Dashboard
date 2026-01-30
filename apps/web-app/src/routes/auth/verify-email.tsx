import { Skeleton } from '@/components/ui/skeleton';
import { authClient } from '@/lib/auth-client';
import { AuthLoading, RedirectToSignIn, SignedIn } from '@daveyplate/better-auth-ui';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';

import { z } from 'zod';

export const Route = createFileRoute('/auth/verify-email')({
    component: RouteComponent,
    validateSearch: z.object({
        token: z.string().optional(),
    }),
})

function RouteComponent() {
    return <VerifyEmailContent />
}

function VerifyEmailContent() {

    const { token } = Route.useSearch()
    const navigate = useNavigate();


    useEffect(() => {
        if (token) {
            authClient.verifyEmail({ query: { token } })
                .then(() => console.log("Verified"))
                .catch(console.error);
        }
        navigate({ to: '/auth/$authView', params: { authView: 'sign-in' } })


    }, [token]);


    return (
        <>
            <AuthLoading>
                <Skeleton />
            </AuthLoading>

            <RedirectToSignIn />
            <SignedIn>
                <div>
                    <p>
                        Now that your email is verified, you can continue using the application.
                    </p>
                    <Link to="/auth/$authView" params={{ authView: 'sign-in' }} className="w-full my-2 bg-primary">Continue to Login</Link>
                </div>
            </SignedIn>
        </>
    );
}
