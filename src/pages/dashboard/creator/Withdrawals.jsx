import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const CREDITS_PER_DOLLAR = 20;
const MIN_CREDITS = 200;

const Withdrawals = () => {
  const [stats, setStats] = useState(null);
  const [credits, setCredits] = useState("");
  const [system, setSystem] = useState("stripe");
  const [account, setAccount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadStats = () => api.get("/campaigns/mine/stats").then((res) => setStats(res.data));
  useEffect(() => { loadStats(); }, []);

  if (!stats) return <Spinner />;

  const totalRaised = stats.totalRaised;
  const canWithdraw = totalRaised >= MIN_CREDITS;
  const withdrawAmount = credits ? (Number(credits) / CREDITS_PER_DOLLAR).toFixed(2) : "0.00";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(credits) > totalRaised) return toast.error("Cannot exceed your total raised credits");

    setSubmitting(true);
    try {
      await api.post("/withdrawals", {
        withdrawal_credit: Number(credits),
        payment_system: system,
        account_number: account,
      });
      toast.success("Withdrawal request submitted");
      setCredits("");
      setAccount("");
      loadStats();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit withdrawal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl mb-6">Withdrawals</h1>

      <div className="card p-5 mb-8">
        <p className="text-sm text-ink/50">Total raised credits</p>
        <p className="text-3xl font-display mt-1">{totalRaised}</p>
        <p className="text-sm text-ink/50 mt-1">≈ ${(totalRaised / CREDITS_PER_DOLLAR).toFixed(2)} available to withdraw</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-5 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Credits to withdraw</label>
          <input
            type="number"
            min={MIN_CREDITS}
            max={totalRaised}
            required
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="input"
            placeholder={`Minimum ${MIN_CREDITS} credits`}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Withdraw amount ($)</label>
          <input className="input bg-teal-light/40" value={withdrawAmount} disabled />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Payment system</label>
          <select value={system} onChange={(e) => setSystem(e.target.value)} className="input">
            <option value="stripe">Stripe</option>
            <option value="bkash">Bkash</option>
            <option value="rocket">Rocket</option>
            <option value="nagad">Nagad</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Account number</label>
          <input required value={account} onChange={(e) => setAccount(e.target.value)} className="input" placeholder="01XXXXXXXXX" />
        </div>

        {canWithdraw ? (
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Submitting..." : "Withdraw"}
          </button>
        ) : (
          <p className="text-center text-sm text-red-600 py-2">Insufficient credit — you need at least {MIN_CREDITS} raised credits to withdraw.</p>
        )}
      </form>
    </div>
  );
};

export default Withdrawals;
