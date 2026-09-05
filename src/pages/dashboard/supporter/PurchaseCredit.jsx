import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import { useAuth } from "../../../context/AuthContext.jsx";
import Spinner from "../../../components/Spinner.jsx";

// NOTE: This uses a simplified Stripe flow for clarity. For full production
// Stripe Elements (card entry UI), wrap this in @stripe/react-stripe-js's
// <Elements> using the clientSecret returned from /payments/create-intent.
// If STRIPE_SECRET_KEY isn't set on the server, this automatically falls
// back to a dummy (instant-success) payment so the flow always works.
const PurchaseCredit = () => {
  const [packages, setPackages] = useState(null);
  const [processing, setProcessing] = useState(null);
  const { refreshProfile } = useAuth();

  useEffect(() => {
    api.get("/payments/packages").then((res) => setPackages(res.data));
  }, []);

  const handleBuy = async (pkg) => {
    setProcessing(pkg.credits);
    try {
      const { data } = await api.post("/payments/create-intent", { credits: pkg.credits });

      if (data.dummy) {
        // No Stripe key configured — simulate a successful payment.
        await api.post("/payments/confirm", { credits: pkg.credits, amount_paid: pkg.price });
      } else {
        // In a full integration, collect card details with Stripe Elements
        // here using data.clientSecret, then confirm on success:
        await api.post("/payments/confirm", {
          credits: pkg.credits,
          amount_paid: pkg.price,
          transaction_id: data.clientSecret,
        });
      }

      await refreshProfile();
      toast.success(`${pkg.credits} credits added to your account!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setProcessing(null);
    }
  };

  if (!packages) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-2">Purchase credit</h1>
      <p className="text-ink/60 mb-8">10 credits = $1. Choose a package to top up your balance.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {packages.map((pkg) => (
          <div key={pkg.credits} className="card p-6 text-center flex flex-col items-center gap-3">
            <p className="text-3xl font-display text-teal">{pkg.credits}</p>
            <p className="text-sm text-ink/50">credits</p>
            <p className="text-xl font-semibold">${pkg.price}</p>
            <button
              onClick={() => handleBuy(pkg)}
              disabled={processing === pkg.credits}
              className="btn-amber w-full mt-2 text-sm"
            >
              {processing === pkg.credits ? "Processing..." : "Buy now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCredit;
