import { createAuthClient } from "better-auth/react";

const apiURL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

// Points the browser at the server's better-auth routes (mounted at
// /api/auth on the Express server). Session cookies are httpOnly, so all
// requests are made with credentials: "include".
export const authClient = createAuthClient({
  baseURL: `${apiURL}/api/auth`,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
