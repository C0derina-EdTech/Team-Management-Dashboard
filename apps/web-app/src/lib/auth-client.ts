import { createAuthClient } from "better-auth/react"
import { adminClient, emailOTPClient } from "better-auth/client/plugins";

const config = {
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:4000",
  plugins: [
    adminClient(),
    emailOTPClient(),
  ],
}
type AuthClient = ReturnType<typeof createAuthClient<typeof config>>;
export const authClient: AuthClient = createAuthClient(config);