import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import NotificationBell from "./NotificationBell.jsx";

const GITHUB_CLIENT_REPO = "https://github.com/theashikulakash/riseflow";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-teal" : "text-ink/70 hover:text-teal"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-teal/10">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#0F5257" />
            <path d="M16 7l6 4v10l-6 4-6-4V11l6-4z" fill="#F2A541" />
          </svg>
          <span className="font-display text-xl">RiseFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/campaigns" className={linkClass}>Explore Campaigns</NavLink>

          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}

          {user && (
            <span className="text-sm text-ink/70">
              <span className="font-semibold text-teal-dark">{user.credits}</span> credits
            </span>
          )}

          {user && <NotificationBell />}

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="inline-flex rounded-full ring-2 ring-white shadow-sm hover:ring-teal transition-all"
                key={user.photoURL || user.image || user.name}
              >
                <img
                  src={user.photoURL || user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0F5257&color=fff`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                  title={user.name}
                />
              </Link>
              <button onClick={logout} className="text-sm text-ink/70 hover:text-red-600">
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <button onClick={() => navigate("/register")} className="btn-primary text-sm">
                Register
              </button>
            </>
          )}

          <a href={GITHUB_CLIENT_REPO} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
            Join as Developer
          </a>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3 bg-cream border-t border-teal/10">
          <NavLink to="/campaigns" onClick={() => setOpen(false)} className={linkClass}>Explore Campaigns</NavLink>
          {user && <NavLink to="/dashboard" onClick={() => setOpen(false)} className={linkClass}>Dashboard</NavLink>}
          {user ? (
            <button onClick={logout} className="text-left text-sm text-red-600">Logout</button>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)} className={linkClass}>Login</NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)} className={linkClass}>Register</NavLink>
            </>
          )}
          <a href={GITHUB_CLIENT_REPO} target="_blank" rel="noreferrer" className="text-sm text-teal">
            Join as Developer
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
