"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client";


export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { slug } = useParams<{ slug: string }>()


  return (
    <NextThemesProvider
      attribute={["class", "data-mode"]}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <AuthUIProvider
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => router.refresh()}
        social={{
          providers: ["google"],

        }}

        account={{
          // basePath: "/dashboard",
          // fields: ["image", "name"]
        }}
        organization={{
          basePath: "/organization",
        }}
        twoFactor={["otp", "totp"]}
        Link={Link}
        // localizeErrors={false}
        emailVerification={true}
      >
        {children}
      </AuthUIProvider>
    </NextThemesProvider>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      defaults: "2025-05-24",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
