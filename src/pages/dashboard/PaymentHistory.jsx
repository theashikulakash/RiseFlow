import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { useAuth } from "../../context/AuthContext.jsx";
import Spinner from "../../components/Spinner.jsx";

// Shared between Supporter (credit purchases) and Creator (withdrawals),
// since both live at /dashboard/payment-history but read different data.
const PaymentHistory = () => {
  const { user } = useAuth();
  const [items, setItems] = useState(null);

  useEffect(() => {
    const endpoint = user.role === "creator" ? "/withdrawals/mine" : "/payments/mine";
    api.get(endpoint).then((res) => setItems(res.data));
  }, [user.role]);

  if (!items) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-6">Payment history</h1>
      {items.length === 0 ? (
        <p className="text-ink/50">No payments yet.</p>
      ) : user.role === "creator" ? (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Date</th><th>Credits withdrawn</th><th>Amount ($)</th><th>Payment system</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((w) => (
                <tr key={w._id}>
                  <td>{new Date(w.withdraw_date).toLocaleDateString()}</td>
                  <td>{w.withdrawal_credit}</td>
                  <td>${w.withdrawal_amount}</td>
                  <td className="capitalize">{w.payment_system}</td>
                  <td><span className={`badge badge-${w.status}`}>{w.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Date</th><th>Credits purchased</th><th>Amount paid ($)</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>{p.credits_purchased}</td>
                  <td>${p.amount_paid}</td>
                  <td className="capitalize">{p.payment_method}</td>
                  <td><span className="badge badge-approved">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
