import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import { uploadToImgBB } from "../../../lib/imgbb.js";

const CATEGORIES = ["Technology", "Art", "Community", "Health"];

const AddCampaign = () => {
  const [form, setForm] = useState({
    campaign_title: "",
    campaign_story: "",
    category: CATEGORIES[0],
    funding_goal: "",
    minimum_Contribution: "",
    deadline: "",
    reward_info: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please add a cover image");

    setSubmitting(true);
    try {
      const campaign_image_url = await uploadToImgBB(imageFile);
      await api.post("/campaigns", {
        ...form,
        funding_goal: Number(form.funding_goal),
        minimum_Contribution: Number(form.minimum_Contribution),
        campaign_image_url,
      });
      toast.success("Campaign submitted — pending admin approval");
      navigate("/dashboard/my-campaigns");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not create campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl mb-6">Add a new campaign</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Campaign title</label>
          <input name="campaign_title" required value={form.campaign_title} onChange={onChange} className="input" placeholder="Help us build a solar-powered water pump" />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Campaign story</label>
          <textarea name="campaign_story" required rows={5} value={form.campaign_story} onChange={onChange} className="input" placeholder="Describe the problem, your plan, and why it matters" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Category</label>
            <select name="category" value={form.category} onChange={onChange} className="input">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Deadline</label>
            <input type="date" name="deadline" required value={form.deadline} onChange={onChange} className="input" min={new Date().toISOString().split("T")[0]} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Funding goal (credits)</label>
            <input type="number" name="funding_goal" required min={1} value={form.funding_goal} onChange={onChange} className="input" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Minimum contribution (credits)</label>
            <input type="number" name="minimum_Contribution" required min={1} value={form.minimum_Contribution} onChange={onChange} className="input" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Reward info</label>
          <textarea name="reward_info" required rows={3} value={form.reward_info} onChange={onChange} className="input" placeholder="What supporters receive for pledging" />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Cover image</label>
          <input type="file" accept="image/*" required onChange={(e) => setImageFile(e.target.files[0])} className="input" />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? "Submitting..." : "Add campaign"}
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
