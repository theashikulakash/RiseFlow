import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ campaign_title: "", campaign_story: "", reward_info: "" });

  const load = () => api.get("/campaigns/mine/list").then((res) => setCampaigns(res.data));

  useEffect(() => { load(); }, []);

  const openEdit = (c) => {
    setEditing(c);
    setForm({ campaign_title: c.campaign_title, campaign_story: c.campaign_story, reward_info: c.reward_info });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/campaigns/${editing._id}`, form);
      toast.success("Campaign updated");
      setEditing(null);
      load();
    } catch {
      toast.error("Could not update campaign");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this campaign? Approved supporters will be refunded.")) return;
    try {
      await api.delete(`/campaigns/${id}`);
      toast.success("Campaign deleted, supporters refunded");
      load();
    } catch {
      toast.error("Could not delete campaign");
    }
  };

  if (!campaigns) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-6">My campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-ink/50">You haven't launched a campaign yet.</p>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Title</th><th>Category</th><th>Raised / Goal</th><th>Deadline</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c._id}>
                  <td>{c.campaign_title}</td>
                  <td>{c.category}</td>
                  <td>{c.amount_raised} / {c.funding_goal}</td>
                  <td>{new Date(c.deadline).toLocaleDateString()}</td>
                  <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                  <td className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="btn-secondary text-xs px-3 py-1.5">Update</button>
                    <button onClick={() => handleDelete(c._id)} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-md hover:bg-red-100">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 p-5" onClick={() => setEditing(null)}>
          <form onSubmit={saveEdit} className="card p-6 max-w-lg w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg mb-2">Update campaign</h3>
            <input className="input" value={form.campaign_title} onChange={(e) => setForm({ ...form, campaign_title: e.target.value })} placeholder="Title" />
            <textarea className="input" rows={4} value={form.campaign_story} onChange={(e) => setForm({ ...form, campaign_story: e.target.value })} placeholder="Story" />
            <textarea className="input" rows={2} value={form.reward_info} onChange={(e) => setForm({ ...form, reward_info: e.target.value })} placeholder="Reward info" />
            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1 text-sm">Save changes</button>
              <button type="button" onClick={() => setEditing(null)} className="btn-secondary flex-1 text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;
