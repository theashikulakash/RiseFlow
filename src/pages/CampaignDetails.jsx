import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import Spinner from "../components/Spinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const load = () => api.get(`/campaigns/${id}`).then((res) => setCampaign(res.data));

  useEffect(() => {
    load();
  }, [id]);

  if (!campaign) return <Spinner full />;

  const pct = Math.min(100, Math.round((campaign.amount_raised / campaign.funding_goal) * 100));

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in as a supporter to contribute");
    if (user.role !== "supporter") return toast.error("Only supporters can contribute");

    setSubmitting(true);
    try {
      await api.post("/contributions", {
        campaign_id: campaign._id,
        Contribution_amount: Number(amount),
        message,
      });
      toast.success("Contribution submitted — awaiting creator approval");
      setAmount("");
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit contribution");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reports", { campaign_id: campaign._id, reason: reportReason });
      toast.success("Report submitted to the admin team");
      setShowReport(false);
      setReportReason("");
    } catch {
      toast.error("Could not submit report");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <img src={campaign.campaign_image_url} alt="" className="w-full h-72 object-cover rounded-lg mb-6" />

      <span className="text-xs uppercase tracking-wide text-teal/70">{campaign.category}</span>
      <h1 className="text-3xl mt-2 mb-2">{campaign.campaign_title}</h1>
      <p className="text-ink/60 mb-6">by {campaign.creator_name} · deadline {new Date(campaign.deadline).toLocaleDateString()}</p>

      <div className="mb-8">
        <div className="h-2 bg-teal/10 rounded-full overflow-hidden">
          <div className="h-full bg-amber rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-sm text-ink/60 mt-2">
          <span>{campaign.amount_raised} raised of {campaign.funding_goal} credits ({pct}%)</span>
          <span>Min. contribution: {campaign.minimum_Contribution}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl mb-2">The story</h2>
            <p className="text-ink/70 leading-relaxed whitespace-pre-line">{campaign.campaign_story}</p>
          </div>
          <div>
            <h2 className="text-xl mb-2">What supporters receive</h2>
            <p className="text-ink/70 leading-relaxed">{campaign.reward_info}</p>
          </div>

          {user && user.role === "supporter" && (
            <button onClick={() => setShowReport((s) => !s)} className="text-sm text-red-600 underline">
              Report this campaign
            </button>
          )}

          {showReport && (
            <form onSubmit={handleReport} className="card p-4 space-y-3">
              <textarea
                required
                className="input"
                rows={3}
                placeholder="Why are you reporting this campaign?"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
              <button className="btn-secondary text-sm">Submit report</button>
            </form>
          )}
        </div>

        <div className="card p-5 h-fit">
          <h3 className="text-lg mb-4">Make a contribution</h3>
          <form onSubmit={handleContribute} className="space-y-3">
            <input
              type="number"
              min={campaign.minimum_Contribution}
              required
              className="input"
              placeholder={`Min. ${campaign.minimum_Contribution} credits`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <textarea
              className="input"
              rows={3}
              placeholder="Optional message to the creator"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? "Submitting..." : "Contribute"}
            </button>
            {user && <p className="text-xs text-ink/50 text-center">You have {user.credits} credits available</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
