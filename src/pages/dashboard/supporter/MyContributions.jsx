import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const MyContributions = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setData(null);
    api.get(`/contributions/mine?page=${page}&limit=8`).then((res) => setData(res.data));
  }, [page]);

  return (
    <div>
      <h1 className="text-2xl mb-6">My contributions</h1>

      {!data ? (
        <Spinner />
      ) : data.items.length === 0 ? (
        <p className="text-ink/50">You haven't contributed to any campaigns yet.</p>
      ) : (
        <>
          <div className="card table-wrap overflow-x-auto">
            <table>
              <thead>
                <tr><th>Campaign</th><th>Amount</th><th>Creator</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data.items.map((c) => (
                  <tr key={c._id}>
                    <td>{c.campaign_title}</td>
                    <td>{c.Contribution_amount} credits</td>
                    <td>{c.creator_name}</td>
                    <td>{new Date(c.current_date).toLocaleDateString()}</td>
                    <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn-secondary text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-ink/60">Page {data.page} of {data.totalPages}</span>
            <button
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="btn-secondary text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyContributions;
