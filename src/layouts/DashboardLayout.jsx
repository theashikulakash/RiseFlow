import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import NotificationBell from "../components/NotificationBell.jsx";

const NAV_BY_ROLE = {
  supporter: [
    { to: "/dashboard/supporter-home", label: "Home" },
    { to: "/campaigns", label: "Explore Campaigns" },
    { to: "/dashboard/my-contributions", label: "My Contributions" },
    { to: "/dashboard/purchase-credit", label: "Purchase Credit" },
    { to: "/dashboard/payment-history", label: "Payment History" },
  ],
  creator: [
    { to: "/dashboard/creator-home", label: "Home" },
    { to: "/dashboard/add-campaign", label: "Add New Campaign" },
    { to: "/dashboard/my-campaigns", label: "My Campaigns" },
    { to: "/dashboard/withdrawals", label: "Withdrawals" },
    { to: "/dashboard/payment-history", label: "Payment History" },
  ],
  admin: [
    { to: "/dashboard/admin-home", label: "Home" },
    { to: "/dashboard/manage-users", label: "Manage Users" },
    { to: "/dashboard/manage-campaigns", label: "Manage Campaigns" },
    { to: "/dashboard/withdrawal-requests", label: "Withdrawal Requests" },
    { to: "/dashboard/reports", label: "Reports" },
  ],
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const nav = NAV_BY_ROLE[user?.role] || [];

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 bg-ink text-cream hidden md:flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-cream/10">
          <svg width="26" height="26" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#FAF7F2" />
            <path d="M16 7l6 4v10l-6 4-6-4V11l6-4z" fill="#F2A541" />
          </svg>
          <span className="font-display text-lg">RiseFlow</span>
        </Link>

        <div className="px-6 py-5 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <img
              src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=F2A541&color=122622`}
              className="h-10 w-10 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-cream/50 capitalize">{user?.role}</p>
            </div>
          </div>
          <p className="text-sm mt-3 text-amber font-medium">{user?.credits} credits</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive ? "bg-teal text-cream" : "text-cream/70 hover:bg-cream/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="m-3 px-3 py-2.5 rounded-md text-sm text-left text-cream/70 hover:bg-cream/5"
        >
          Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-teal/10 flex items-center justify-between px-5 md:px-8 bg-cream">
          <p className="text-sm text-ink/50 capitalize md:hidden">{user?.role} dashboard</p>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink/70">
              <span className="font-semibold text-teal-dark">{user?.credits}</span> credits
            </span>
            <NotificationBell />
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
