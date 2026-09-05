import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signIn, signUp } from "../lib/auth-client";
import { useAuth } from "../context/AuthContext.jsx";
import { uploadToImgBB } from "../lib/imgbb.js";
import { FcGoogle } from "react-icons/fc";

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "supporter" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PASSWORD_RULE.test(form.password)) {
      toast.error("Password needs 6+ chars, one uppercase, one lowercase, and a number");
      return;
    }

    setLoading(true);
    try {
      let photoURL = "";
      if (imageFile) {
        photoURL = await uploadToImgBB(imageFile);
      }

      const { error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        photoURL,
      });

      if (error) {
        // better-auth surfaces "user already exists" for duplicate emails
        toast.error(error.message || "Registration failed");
        return;
      }

      await refreshProfile();
      toast.success(`Welcome! You've been credited ${form.role === "creator" ? 20 : 50} starting credits.`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: `${window.location.origin}/dashboard` });
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="text-3xl mb-2">Create your account</h1>
      <p className="text-ink/60 mb-8">
        Supporters start with 50 credits, creators with 20 — on us.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Full name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={onChange}
            className="input"
            placeholder="Jamie Rivera"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={onChange}
            className="input"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Profile picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={onChange}
            className="input"
            placeholder="At least 6 chars, 1 upper, 1 lower, 1 number"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">I want to join as</label>
          <select name="role" value={form.role} onChange={onChange} className="input">
            <option value="supporter">Supporter — I want to back campaigns</option>
            <option value="creator">Creator — I want to launch a campaign</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account..." : "Create account"}
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
        Already have an account?{" "}
        <Link to="/login" className="text-teal font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
