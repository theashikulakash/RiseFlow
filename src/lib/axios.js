import axios from "axios";

const configuredURL = import.meta.env.VITE_API_URL || "";
const apiURL = (configuredURL && !/localhost|127\.0\.0\.1/.test(configuredURL)
  ? configuredURL
  : window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://riseflow-server.vercel.app").replace(/\/+$/, "");

// Shared axios instance for all non-auth API calls. withCredentials sends
// the better-auth session cookie along with every request so the server's
// requireAuth middleware can identify the caller.
const api = axios.create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});

export default api;
