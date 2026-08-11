import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ListChecks,
  Building2,
  Users,
  MessageSquare,
  CheckCircle,
  UserCheck,
  UserX,
  RefreshCcw,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../services/api";
import { getUser, isAdmin } from "../utils/auth";

const metricCard = (title, value, icon) => (
  <div className=" rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          {title}
        </p>
        <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!isAdmin()) {
      toast.error("Admin access required.");
      navigate("/");
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const refreshData = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    try {
      const [dashboardRes, propertiesRes] = await Promise.all([
        api.get("/api/admin/dashboard"),
        api.get("/api/properties?limit=100"),
      ]);

      setDashboardData(dashboardRes.data);
      setPendingProperties(
        (propertiesRes.data?.properties || []).filter(
          (property) => property.status === "pending",
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchUsers = async () => {
    setUsersLoading(true);

    try {
      const response = await api.get("/api/admin/users");
      setUsers(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    fetchUsers();
  }, [refreshData]);

  const handleApprove = async (id) => {
    try {
      await api.put(`/api/admin/approve/${id}`);
      toast.success("Property approved.");
      await refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/api/admin/reject/${id}`);
      toast.success("Property rejected.");
      await refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleToggleUserStatus = async (targetUser) => {
    try {
      await api.put(`/api/admin/users/${targetUser._id}/status`);
      toast.success(
        `User ${targetUser.isActive ? "deactivated" : "activated"} successfully`,
      );
      await fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <main className="mt-20 bg-slate-50 min-h-screen pt-[110px] pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 p-10 shadow-lg text-white">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-200">
                Admin Dashboard
              </p>
              <h1 className="mt-4 text-5xl font-black">
                Welcome back, {user?.firstName || "Admin"}.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-200/90">
                Review platform activity, moderate new listings, and keep the
                marketplace healthy.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
                Updated live
              </span>
              <button
                onClick={refreshData}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                <RefreshCcw size={18} />
                Refresh data
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {metricCard(
            "Total Users",
            dashboardData?.totalUsers || 0,
            <Users size={24} />,
          )}
          {metricCard(
            "Total Properties",
            dashboardData?.totalProperties || 0,
            <Building2 size={24} />,
          )}
          {metricCard(
            "Total Inquiries",
            dashboardData?.totalInquiries || 0,
            <MessageSquare size={24} />,
          )}
          {metricCard(
            "Total Favorites",
            dashboardData?.totalFavorites || 0,
            <ShieldCheck size={24} />,
          )}
          {metricCard(
            "Pending Properties",
            dashboardData?.pendingProperties || 0,
            <ListChecks size={24} />,
          )}
          {metricCard(
            "Approved Properties",
            dashboardData?.approvedProperties || 0,
            <CheckCircle size={24} />,
          )}
          {metricCard(
            "Sold Properties",
            dashboardData?.soldProperties || 0,
            <Building2 size={24} />,
          )}
        </motion.div>

        <section className="mt-12 rounded-[36px] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                Pending Approvals
              </h2>
              <p className="mt-2 text-slate-500">
                Review new property submissions before they go live.
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              {pendingProperties.length} pending
            </span>
          </div>

          {loading ? (
            <div className="mt-10 text-center text-slate-500">Loading...</div>
          ) : pendingProperties.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-slate-500">
                No properties waiting for review.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
              className="mt-8 space-y-4"
            >
              {pendingProperties.map((property) => (
                <motion.div
                  key={property._id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {property.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          ₦
                          {property.price?.toLocaleString?.() || property.price}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {property.city}, {property.state}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 capitalize">
                          {property.propertyType || "Property"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprove(property._id)}
                        className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Approve
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReject(property._id)}
                        className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                      >
                        Reject
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        <section className="mt-12 rounded-[36px] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                Manage Users
              </h2>
              <p className="mt-2 text-slate-500">
                Activate or deactivate user accounts.
              </p>
            </div>
          </div>

          {usersLoading ? (
            <div className="mt-10 text-center text-slate-500">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-slate-500">No users found.</p>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
              <table className="min-w-[800px] w-full text-left divide-y divide-slate-200 bg-white">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 text-sm font-semibold text-slate-500">
                      Name
                    </th>
                    <th className="pb-3 text-sm font-semibold text-slate-500">
                      Email
                    </th>
                    <th className="pb-3 text-sm font-semibold text-slate-500">
                      Role
                    </th>
                    <th className="pb-3 text-sm font-semibold text-slate-500">
                      Status
                    </th>
                    <th className="pb-3 text-sm font-semibold text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((targetUser) => (
                    <tr
                      key={targetUser._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="py-4 text-sm font-semibold text-slate-900">
                        {targetUser.firstName} {targetUser.lastName}
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        {targetUser.email}
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        {targetUser.role}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            targetUser.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {targetUser.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => handleToggleUserStatus(targetUser)}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                            targetUser.isActive
                              ? "border border-rose-600 text-rose-600 hover:bg-rose-50"
                              : "border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {targetUser.isActive ? (
                            <>
                              <UserX size={16} />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck size={16} />
                              Activate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
