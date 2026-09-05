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

const CreatorHome = () => {
  const [stats, setStats] = useState(null);
  const [review, setReview] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  const loadReview = () => api.get("/contributions/review").then((res) => setReview(res.data));

  useEffect(() => {
    api.get("/campaigns/mine/stats").then((res) => setStats(res.data));
    loadReview();
  }, []);

  const act = async (id, action) => {
    try {
      await api.patch(`/contributions/${id}/${action}`);
      toast.success(`Contribution ${action}d`);
      loadReview();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-6">Creator dashboard</h1>

      {!stats ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <StatCard label="Total campaigns" value={stats.totalCampaigns} />
          <StatCard label="Active campaigns" value={stats.activeCampaigns} />
          <StatCard label="Total amount raised" value={`${stats.totalRaised} credits`} />
        </div>
      )}

      <h2 className="text-xl mb-4">Contributions to review</h2>
      {!review ? (
        <Spinner />
      ) : review.length === 0 ? (
        <p className="text-ink/50">No pending contributions.</p>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Supporter</th><th>Campaign</th><th>Amount</th><th></th><th>Actions</th></tr>
            </thead>
            <tbody>
              {review.map((c) => (
                <tr key={c._id}>
                  <td>{c.Supporter_name}</td>
                  <td>{c.campaign_title}</td>
                  <td>{c.Contribution_amount} credits</td>
                  <td>
                    <button onClick={() => setModalItem(c)} className="text-teal text-sm underline">
                      View
                    </button>
                  </td>
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

      {modalItem && (
        <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 p-5" onClick={() => setModalItem(null)}>
          <div className="card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg mb-3">Contribution message</h3>
            <p className="text-sm text-ink/50 mb-1">From {modalItem.Supporter_name} · {modalItem.Contribution_amount} credits</p>
            <p className="text-ink/80 mt-3">{modalItem.message || "No message included."}</p>
            <button onClick={() => setModalItem(null)} className="btn-secondary w-full mt-5 text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorHome;
