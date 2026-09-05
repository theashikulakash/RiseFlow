import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ExploreCampaigns from "./pages/ExploreCampaigns.jsx";
import CampaignDetails from "./pages/CampaignDetails.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Spinner from "./components/Spinner.jsx";

import SupporterHome from "./pages/dashboard/supporter/SupporterHome.jsx";
import MyContributions from "./pages/dashboard/supporter/MyContributions.jsx";
import PurchaseCredit from "./pages/dashboard/supporter/PurchaseCredit.jsx";

import CreatorHome from "./pages/dashboard/creator/CreatorHome.jsx";
import AddCampaign from "./pages/dashboard/creator/AddCampaign.jsx";
import MyCampaigns from "./pages/dashboard/creator/MyCampaigns.jsx";
import Withdrawals from "./pages/dashboard/creator/Withdrawals.jsx";

import AdminHome from "./pages/dashboard/admin/AdminHome.jsx";
import ManageUsers from "./pages/dashboard/admin/ManageUsers.jsx";
import ManageCampaigns from "./pages/dashboard/admin/ManageCampaigns.jsx";
import WithdrawalRequests from "./pages/dashboard/admin/WithdrawalRequests.jsx";
import Reports from "./pages/dashboard/admin/Reports.jsx";

import PaymentHistory from "./pages/dashboard/PaymentHistory.jsx";

// /dashboard alone redirects to the correct role-specific home page.
const DashboardIndex = () => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner full />;
  const map = {
    supporter: "/dashboard/supporter-home",
    creator: "/dashboard/creator-home",
    admin: "/dashboard/admin-home",
  };
  return <Navigate to={map[user?.role] || "/"} replace />;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-[70vh]">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public / basic layout */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/campaigns" element={<PublicLayout><ExploreCampaigns /></PublicLayout>} />
      <Route path="/campaigns/:id" element={<PublicLayout><CampaignDetails /></PublicLayout>} />

      {/* Dashboard layout (private) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardIndex />} />

        {/* Supporter */}
        <Route path="supporter-home" element={<RoleRoute roles={["supporter"]}><SupporterHome /></RoleRoute>} />
        <Route path="my-contributions" element={<RoleRoute roles={["supporter"]}><MyContributions /></RoleRoute>} />
        <Route path="purchase-credit" element={<RoleRoute roles={["supporter"]}><PurchaseCredit /></RoleRoute>} />

        {/* Creator */}
        <Route path="creator-home" element={<RoleRoute roles={["creator"]}><CreatorHome /></RoleRoute>} />
        <Route path="add-campaign" element={<RoleRoute roles={["creator"]}><AddCampaign /></RoleRoute>} />
        <Route path="my-campaigns" element={<RoleRoute roles={["creator"]}><MyCampaigns /></RoleRoute>} />
        <Route path="withdrawals" element={<RoleRoute roles={["creator"]}><Withdrawals /></RoleRoute>} />

        {/* Admin */}
        <Route path="admin-home" element={<RoleRoute roles={["admin"]}><AdminHome /></RoleRoute>} />
        <Route path="manage-users" element={<RoleRoute roles={["admin"]}><ManageUsers /></RoleRoute>} />
        <Route path="manage-campaigns" element={<RoleRoute roles={["admin"]}><ManageCampaigns /></RoleRoute>} />
        <Route path="withdrawal-requests" element={<RoleRoute roles={["admin"]}><WithdrawalRequests /></RoleRoute>} />
        <Route path="reports" element={<RoleRoute roles={["admin"]}><Reports /></RoleRoute>} />

        {/* Shared */}
        <Route path="payment-history" element={<PaymentHistory />} />
      </Route>

      <Route path="*" element={<PublicLayout><div className="text-center py-32"><h1 className="text-3xl mb-2">Page not found</h1><p className="text-ink/50">The page you're looking for doesn't exist.</p></div></PublicLayout>} />
    </Routes>
  );
}

export default App;
