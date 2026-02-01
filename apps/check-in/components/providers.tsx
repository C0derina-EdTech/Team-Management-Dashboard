"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client";


export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

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
        // multiSession
        // magicLink
        // passkey
        avatar={{
          upload: async (file) => {
            const formData = new FormData()
            formData.append("avatar", file)
            const res = await fetch("/api/uploadAvatar", { method: "POST", body: formData })
            const { data } = await res.json()
            return data.url
          },
          delete: async (url) => {
            await fetch("/api/deleteAvatar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url })
            })
          },
          // Custom Image component for rendering avatar images
          // Useful for CDN optimization (Cloudinary, Imgix, ImgProxy, etc.)
          // Image: Image, // Use Next.js Image component for avatars


        }}
        // gravatar={{
        //   size: 100,
        //   forceDefault: true,
        // }}
        // captcha={{
        //   provider: "google-recaptcha-v3",
        //   siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
        // }}
        account={{
          // basePath: "/dashboard",
          // fields: ["image", "name"]
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
