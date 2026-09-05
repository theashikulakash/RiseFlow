import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const StatCard = ({ label, value }) => (
  <div className="card p-5">
    <p className="text-sm text-ink/50">{label}</p>
    <p className="text-3xl font-display mt-2">{value}</p>
  </div>
);

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState(null);

  const loadPending = () => api.get("/campaigns/admin/pending").then((res) => setPending(res.data));

  useEffect(() => {
    api.get("/users/stats/admin").then((res) => setStats(res.data));
    loadPending();
  }, []);

  const act = async (id, action) => {
    try {
      await api.patch(`/campaigns/${id}/${action}`);
      toast.success(`Campaign ${action}d`);
      loadPending();
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-6">Admin dashboard</h1>

      {!stats ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total supporters" value={stats.totalSupporters} />
          <StatCard label="Total creators" value={stats.totalCreators} />
          <StatCard label="Total available credits" value={stats.totalCredits} />
          <StatCard label="Total payments processed" value={stats.totalPayments} />
        </div>
      )}

      <h2 className="text-xl mb-4">Campaign approvals</h2>
      {!pending ? (
        <Spinner />
      ) : pending.length === 0 ? (
        <p className="text-ink/50">No campaigns awaiting approval.</p>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Title</th><th>Creator</th><th>Category</th><th>Goal</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {pending.map((c) => (
                <tr key={c._id}>
                  <td>{c.campaign_title}</td>
                  <td>{c.creator_name}</td>
                  <td>{c.category}</td>
                  <td>{c.funding_goal} credits</td>
                  <td className="flex gap-2">
                    <button onClick={() => act(c._id, "approve")} className="btn-primary text-xs px-3 py-1.5">Approve</button>
                    <button onClick={() => act(c._id, "reject")} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-md hover:bg-red-100">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
