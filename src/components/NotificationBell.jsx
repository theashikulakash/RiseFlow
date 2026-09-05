import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import api from "../lib/axios";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/notifications").then((res) => setItems(res.data)).catch(() => {});
  }, []);

  // Clicking anywhere on the page hides the popup.
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unread = items.length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="relative p-2 rounded-full hover:bg-teal-light transition-colors"
        aria-label="Notifications"
      >
        <FiBell size={20} className="text-teal-dark" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-amber text-ink text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto card p-2 z-50">
          {items.length === 0 ? (
            <p className="text-sm text-ink/50 p-4 text-center">No notifications yet</p>
          ) : (
            items.map((n) => (
              <button
                key={n._id}
                onClick={() => {
                  setOpen(false);
                  navigate(n.actionRoute || "/dashboard");
                }}
                className="w-full text-left p-3 rounded-md hover:bg-teal-light/60 transition-colors text-sm border-b border-teal/5 last:border-0"
              >
                <p className="text-ink/90">{n.message}</p>
                <p className="text-xs text-ink/40 mt-1">
                  {new Date(n.time).toLocaleString()}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
