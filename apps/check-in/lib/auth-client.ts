import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  plugins: [
    adminClient(),
    emailOTPClient(),
  ],
}
type AuthClient = ReturnType<typeof createAuthClient<typeof config>>;
export const authClient: AuthClient = createAuthClient(config);


export async function getUser() {
  const { data } = await authClient.getSession()

  if (!data?.user) {
    throw new Error("User not authenticated")
  }

  return {
    user: data.user,
    session: data.session,
    // role : data.user.role,
    isAuthenticated: true,
  }
}