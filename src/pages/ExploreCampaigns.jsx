import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../lib/axios";
import CampaignCard from "../components/CampaignCard.jsx";
import Spinner from "../components/Spinner.jsx";

const CATEGORIES = ["Technology", "Art", "Community", "Health"];

const ExploreCampaigns = () => {
  const [params, setParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState(null);
  const search = params.get("search") || "";
  const category = params.get("category") || "";

  useEffect(() => {
    setCampaigns(null);
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category) query.set("category", category);

    api.get(`/campaigns?${query.toString()}`).then((res) => setCampaigns(res.data)).catch(() => setCampaigns([]));
  }, [search, category]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <h1 className="text-3xl mb-6">Explore campaigns</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          className="input sm:max-w-xs"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setParams({ search: e.target.value, category })}
        />
        <select
          className="input sm:max-w-[200px]"
          value={category}
          onChange={(e) => setParams({ search, category: e.target.value })}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {campaigns === null ? (
        <Spinner />
      ) : campaigns.length === 0 ? (
        <p className="text-ink/50">No campaigns match your filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c._id} campaign={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCampaigns;
