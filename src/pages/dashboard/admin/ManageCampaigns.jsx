import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState(null);

  const load = () => api.get("/campaigns/admin/all").then((res) => setCampaigns(res.data));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this campaign permanently?")) return;
    try {
      await api.delete(`/campaigns/${id}/admin`);
      toast.success("Campaign removed");
      load();
    } catch {
      toast.error("Could not delete campaign");
    }
  };

  if (!campaigns) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-6">Manage campaigns</h1>
      <div className="card table-wrap overflow-x-auto">
        <table>
          <thead>
            <tr><th>Title</th><th>Creator</th><th>Category</th><th>Raised / Goal</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id}>
                <td>{c.campaign_title}</td>
                <td>{c.creator_name}</td>
                <td>{c.category}</td>
                <td>{c.amount_raised} / {c.funding_goal}</td>
                <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                <td>
                  <button onClick={() => remove(c._id)} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-md hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCampaigns;
