import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const Reports = () => {
  const [reports, setReports] = useState(null);

  const load = () => api.get("/reports").then((res) => setReports(res.data));
  useEffect(() => { load(); }, []);

  const suspend = async (campaignId, reportId) => {
    try {
      await api.patch(`/campaigns/${campaignId}/suspend`);
      await api.patch(`/reports/${reportId}/resolve`);
      toast.success("Campaign suspended");
      load();
    } catch {
      toast.error("Action failed");
    }
  };

  const deleteCampaign = async (campaignId, reportId) => {
    if (!confirm("Delete the reported campaign permanently?")) return;
    try {
      await api.delete(`/campaigns/${campaignId}/admin`);
      await api.patch(`/reports/${reportId}/resolve`);
      toast.success("Campaign deleted");
      load();
    } catch {
      toast.error("Action failed");
    }
  };

  if (!reports) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-6">Reports</h1>
      {reports.length === 0 ? (
        <p className="text-ink/50">No reports filed.</p>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Campaign</th><th>Reporter</th><th>Reason</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r._id}>
                  <td>{r.campaign_title}</td>
                  <td>{r.reporter_name}</td>
                  <td className="max-w-xs truncate" title={r.reason}>{r.reason}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td><span className={`badge ${r.status === "pending" ? "badge-pending" : "badge-approved"}`}>{r.status}</span></td>
                  <td className="flex gap-2">
                    {r.status === "pending" && (
                      <>
                        <button onClick={() => suspend(r.campaign_id, r._id)} className="btn-secondary text-xs px-3 py-1.5">Suspend</button>
                        <button onClick={() => deleteCampaign(r.campaign_id, r._id)} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-md hover:bg-red-100">Delete</button>
                      </>
                    )}
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

export default Reports;
