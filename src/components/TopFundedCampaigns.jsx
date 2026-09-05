import { useEffect, useState } from "react";
import api from "../lib/axios";
import CampaignCard from "./CampaignCard.jsx";
import Spinner from "./Spinner.jsx";

const TopFundedCampaigns = () => {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    api.get("/campaigns/top-funded").then((res) => setCampaigns(res.data)).catch(() => setCampaigns([]));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <div className="mb-10">
        <span className="text-amber-dark text-sm font-medium">Leading the way</span>
        <h2 className="text-3xl mt-2">Top funded campaigns</h2>
      </div>

      {campaigns === null ? (
        <Spinner />
      ) : campaigns.length === 0 ? (
        <p className="text-ink/50">No approved campaigns yet — be the first to launch one.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c._id} campaign={c} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopFundedCampaigns;
