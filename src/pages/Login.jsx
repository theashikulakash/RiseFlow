import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { signIn } from "../lib/auth-client";
import { useAuth } from "../context/AuthContext.jsx";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }
    await refreshProfile();
    toast.success("Welcome back!");
    navigate(from, { replace: true });
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: `${window.location.origin}/dashboard` });
  };

  return (
    <div className="max-w-md mx-auto px-5 py-20">
      <h1 className="text-3xl mb-2">Welcome back</h1>
      <p className="text-ink/60 mb-8">Log in to track your contributions and campaigns.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-teal/15 flex-1" />
        <span className="text-xs text-ink/40">OR</span>
        <div className="h-px bg-teal/15 flex-1" />
      </div>

      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2 border border-teal/20 rounded-md py-2.5 hover:bg-teal-light/50 transition-colors"
      >
        <FcGoogle size={20} /> Continue with Google
      </button>

      <p className="text-sm text-ink/60 text-center mt-8">
        New here?{" "}
        <Link to="/register" className="text-teal font-medium">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
