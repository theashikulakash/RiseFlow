import { createAuthClient } from "better-auth/react";

// Points the browser at the server's better-auth routes (mounted at
// /api/auth on the Express server). Session cookies are httpOnly, so all
// requests are made with credentials: "include".
export const authClient = createAuthClient({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
