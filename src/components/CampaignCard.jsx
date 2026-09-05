import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const pct = Math.min(
    100,
    Math.round((campaign.amount_raised / campaign.funding_goal) * 100)
  );
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="card overflow-hidden flex flex-col">
      <img
        src={campaign.campaign_image_url}
        alt={campaign.campaign_title}
        className="h-44 w-full object-cover"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs uppercase tracking-wide text-teal/70">{campaign.category}</span>
        <h3 className="font-display text-lg leading-snug">{campaign.campaign_title}</h3>
        <p className="text-sm text-ink/60">by {campaign.creator_name}</p>

        <div className="mt-1">
          <div className="h-1.5 bg-teal/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-ink/60 mt-1.5">
            <span>{campaign.amount_raised} / {campaign.funding_goal} credits</span>
            <span>{daysLeft}d left</span>
          </div>
        </div>

        <Link
          to={`/campaigns/${campaign._id}`}
          className="btn-secondary text-center mt-3 text-sm"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
