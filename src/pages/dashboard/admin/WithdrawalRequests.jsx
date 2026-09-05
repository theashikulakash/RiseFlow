import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const WithdrawalRequests = () => {
  const [items, setItems] = useState(null);

  const load = () => api.get("/withdrawals/pending").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const pay = async (id) => {
    try {
      await api.patch(`/withdrawals/${id}/pay`);
      toast.success("Marked as paid");
      load();
    } catch {
      toast.error("Could not process payment");
    }
  };

  if (!items) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-6">Withdrawal requests</h1>
      {items.length === 0 ? (
        <p className="text-ink/50">No pending withdrawal requests.</p>
      ) : (
        <div className="card table-wrap overflow-x-auto">
          <table>
            <thead>
              <tr><th>Creator</th><th>Credits</th><th>Amount ($)</th><th>System</th><th>Account</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((w) => (
                <tr key={w._id}>
                  <td>{w.creator_name}</td>
                  <td>{w.withdrawal_credit}</td>
                  <td>${w.withdrawal_amount}</td>
                  <td className="capitalize">{w.payment_system}</td>
                  <td>{w.account_number}</td>
                  <td>
                    <button onClick={() => pay(w._id)} className="btn-primary text-xs px-3 py-1.5">Payment Success</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WithdrawalRequests;
