import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const StatCard = ({ label, value }) => (
  <div className="card p-5">
    <p className="text-sm text-ink/50">{label}</p>
    <p className="text-3xl font-display mt-2">{value}</p>
  </div>
);

const SupporterHome = () => {
  const [stats, setStats] = useState(null);
  const [approved, setApproved] = useState(null);

  useEffect(() => {
    api.get("/contributions/mine/stats").then((res) => setStats(res.data));
    api.get("/contributions/mine/approved").then((res) => setApproved(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-6">Welcome back</h1>

      {!stats ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <StatCard label="Total contributions" value={stats.totalContributions} />
          <StatCard label="Pending contributions" value={stats.totalPending} />
          <StatCard label="Total amount contributed" value={`${stats.totalAmount} credits`} />
        </div>
      )}

      <h2 className="text-xl mb-4">Approved contributions</h2>
      {!approved ? (
        <Spinner />
      ) : approved.length === 0 ? (
        <p className="text-ink/50">No approved contributions yet.</p>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Campaign</th><th>Amount</th><th>Creator</th><th>Status</th></tr>
            </thead>
            <tbody>
              {approved.map((c) => (
                <tr key={c._id}>
                  <td>{c.campaign_title}</td>
                  <td>{c.Contribution_amount} credits</td>
                  <td>{c.creator_name}</td>
                  <td><span className="badge badge-approved">{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupporterHome;
