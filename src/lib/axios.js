import axios from "axios";

// Shared axios instance for all non-auth API calls. withCredentials sends
// the better-auth session cookie along with every request so the server's
// requireAuth middleware can identify the caller.
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default api;
