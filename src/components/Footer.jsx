import { FiGithub, FiLinkedin, FiFacebook } from "react-icons/fi";

const Footer = () => (
  <footer className="bg-teal-dark text-cream mt-24">
    <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="7" fill="#FAF7F2" />
          <path d="M16 7l6 4v10l-6 4-6-4V11l6-4z" fill="#F2A541" />
        </svg>
        <span className="font-display text-lg">RiseFlow</span>
      </div>

      <p className="text-sm text-cream/70 text-center">
        Backing ideas that need a first push, one contribution at a time.
      </p>

      <div className="flex items-center gap-4">
        <a href="https://github.com/theashikulakash/riseflow" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-amber">
          <FiGithub size={20} />
        </a>
        <a href="https://linkedin.com/in/theashikulakash" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-amber">
          <FiLinkedin size={20} />
        </a>
        <a href="https://facebook.com/theashikulakash" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-amber">
          <FiFacebook size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
