import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/axios";
import Spinner from "../../../components/Spinner.jsx";

const ManageUsers = () => {
  const [users, setUsers] = useState(null);

  const load = () => api.get("/users").then((res) => setUsers(res.data));
  useEffect(() => { load(); }, []);

  const changeRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      toast.success("Role updated");
      load();
    } catch {
      toast.error("Could not update role");
    }
  };

  const remove = async (id) => {
    if (!confirm("Remove this user permanently?")) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success("User removed");
      load();
    } catch {
      toast.error("Could not remove user");
    }
  };

  if (!users) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl mb-6">Manage users</h1>
      <div className="card table-wrap overflow-x-auto">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Credits</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="flex items-center gap-2">
                  <img src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`} className="h-7 w-7 rounded-full object-cover" alt="" />
                  {u.name}
                </td>
                <td>{u.email}</td>
                <td>
                  <select value={u.role} onChange={(e) => changeRole(u._id, e.target.value)} className="input py-1.5 text-xs">
                    <option value="supporter">Supporter</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{u.credits}</td>
                <td>
                  <button onClick={() => remove(u._id)} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-md hover:bg-red-100">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
