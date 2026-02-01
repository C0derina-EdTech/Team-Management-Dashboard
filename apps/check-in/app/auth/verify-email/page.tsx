"use client";

import { authClient } from "@/lib/auth-client"; // better-auth-ui
import { AuthLoading, RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@coderina-ams/ui/components/skeleton";

export default function VerifyEmail() {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <VerifyEmailContent />
      </Suspense>
    </>
  );
}
function VerifyEmailContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();


  useEffect(() => {
    if (token) {
      authClient.verifyEmail({ query: { token } })
        .then(() => console.log("Verified"))
        .catch(console.error);
    }
    router.push("/auth/sign-in");

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
          <Link href="/auth/sign-in" className="w-full my-2 bg-primary">Continue to Login</Link>
        </div>
      </SignedIn>
    </>
  );
}
