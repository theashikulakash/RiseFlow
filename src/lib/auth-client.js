import { createAuthClient } from "better-auth/react";

const configuredURL = import.meta.env.VITE_API_URL || "";
const apiURL = (configuredURL && !/localhost|127\.0\.0\.1/.test(configuredURL)
  ? configuredURL
  : window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://riseflow-server.vercel.app").replace(/\/+$/, "");

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
