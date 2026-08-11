import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Clock3,
  Layers,
  ArrowRight,
  Pencil,
  Trash2,
  CheckCircle,
  Send,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { getUser, isOwner } from "../utils/auth";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1560184897-e9b1b3f59c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-259329608606?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600017071810-0f8d6b6c6c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490423436-8a7d6b3b3f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];

const getFallbackImage = (id) => {
  const seed = typeof id === "number" ? id : 0;
  return FALLBACK_IMAGES[Math.abs(seed) % FALLBACK_IMAGES.length];
};

const summaryCard = (icon, label, value) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
      {icon}
    </div>
    <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-400">
      {label}
    </p>
    <p className="mt-3 text-4xl font-black text-slate-900">{value}</p>
  </div>
);

const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContent = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 30, scale: 0.97 },
};

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editProperty, setEditProperty] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const [responseInquiry, setResponseInquiry] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [responding, setResponding] = useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!isOwner()) {
      toast.error("Owner access required.");
      navigate("/");
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const refreshData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const [propertiesRes, inquiriesRes] = await Promise.all([
        api.get("/api/properties/my-properties"),
        api.get("/api/inquiries/owner"),
      ]);

      setProperties(propertiesRes.data || []);
      setInquiries(inquiriesRes.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const propertyCounts = useMemo(
    () => ({
      total: properties.length,
      pending: properties.filter((item) => item.status === "pending").length,
      approved: properties.filter((item) => item.status === "approved").length,
      sold: properties.filter((item) => item.status === "sold").length,
    }),
    [properties],
  );

  const startEdit = (property) => {
    setEditProperty(property);
    setEditForm({
      title: property.title || "",
      description: property.description || "",
      price: property.price || "",
      address: property.address || "",
      city: property.city || "",
      state: property.state || "",
      zipCode: property.zipCode || "",
      propertyType: property.propertyType || "house",
      bedrooms: property.bedrooms ?? "",
      bathrooms: property.bathrooms ?? "",
      squareFootage: property.squareFootage ?? "",
      status: property.status || "pending",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editForm.title || !editForm.description || !editForm.price) {
      toast.error("Please fill in the required fields");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/api/properties/${editProperty._id}`, editForm);
      toast.success("Property updated successfully");
      setEditProperty(null);
      await refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    setDeletingId(deleteConfirm);
    setDeleteConfirm(null);

    try {
      await api.delete(`/api/properties/${deleteConfirm}`);
      toast.success("Property deleted successfully");
      await refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleMarkAsSold = async (id) => {
    try {
      await api.put(`/api/properties/${id}`, { status: "sold" });
      toast.success("Property marked as sold");
      await refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleRespond = async (e) => {
    e.preventDefault();

    if (!responseText.trim()) {
      toast.error("Please enter a response");
      return;
    }

    setResponding(true);

    try {
      await api.put(`/api/inquiries/${responseInquiry._id}/respond`, {
        response: responseText,
      });
      toast.success("Response sent to buyer");
      setResponseInquiry(null);
      setResponseText("");
      await refreshData();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setResponding(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen py-24 mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 rounded-[36px] bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Owner Dashboard
          </p>
          <h1 className="mt-4 text-5xl font-black text-slate-900">
            Welcome back, {user?.firstName || "Owner"}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Manage your property listings, track inquiries, and watch your
            portfolio grow.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {summaryCard(
            <Home size={24} />,
            "Total Listings",
            propertyCounts.total,
          )}
          {summaryCard(
            <Layers size={24} />,
            "Approved",
            propertyCounts.approved,
          )}
          {summaryCard(
            <Clock3 size={24} />,
            "Pending",
            propertyCounts.pending,
          )}
          {summaryCard(
            <MessageSquare size={24} />,
            "Inquiries",
            inquiries.length,
          )}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-[36px] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Your Properties
                </h2>
                <p className="mt-2 text-slate-500">
                  All listings created under your account.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                {propertyCounts.total} listings
              </span>
            </div>

            {loading ? (
              <div className="mt-10 text-center text-slate-500">Loading...</div>
            ) : properties.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <p className="text-slate-500">
                  You don&apos;t have any listings yet.
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {properties.map((property) => (
                  <motion.div
                    key={property._id}
                    layout
                    className="rounded-3xl border border-slate-200 p-6 transition hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-6 md:flex-row">
                      <img
                        src={
                          property.images?.length > 0
                            ? property.images[0]
                            : getFallbackImage(property._id)
                        }
                        alt={property.title}
                        onError={(e) => {
                          if (
                            e.target.src !== getFallbackImage(property._id)
                          ) {
                            e.target.src = getFallbackImage(property._id);
                          }
                        }}
                        className="h-44 w-full rounded-2xl object-cover md:w-72"
                      />

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {property.title}
                            </h3>

                            <p className="mt-2 text-slate-500">
                              {property.city}, {property.state}
                            </p>

                            <p className="mt-4 text-slate-600">
                              {property.description}
                            </p>
                          </div>

                          <div className="mt-4 md:mt-0 md:text-right">
                            <h3 className="text-2xl font-bold text-slate-900">
                              {property.title}
                            </h3>

                            <p className="mt-3 text-2xl font-bold text-blue-600">
                              ₦{property.price.toLocaleString()}
                            </p>

                            <span
                              className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                property.status === "approved"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : property.status === "pending"
                                    ? "bg-amber-100 text-amber-700"
                                    : property.status === "sold"
                                      ? "bg-slate-900 text-white"
                                      : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {property.status}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => startEdit(property)}
                            className="inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          {property.status !== "sold" && (
                            <button
                              onClick={() =>
                                handleMarkAsSold(property._id)
                              }
                              className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                            >
                              <CheckCircle size={16} />
                              Mark as Sold
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteClick(property._id)}
                            disabled={deletingId === property._id}
                            className="inline-flex items-center gap-2 rounded-full border border-rose-600 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            <Trash2 size={16} />
                            {deletingId === property._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-[36px] bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900">
                Recent Inquiries
              </h2>
              <p className="mt-2 text-slate-500">
                Messages from prospective buyers.
              </p>

              {loading ? (
                <div className="mt-10 text-center text-slate-500">
                  Loading...
                </div>
              ) : inquiries.length === 0 ? (
                <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-slate-500">No inquiries yet.</p>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <div
                      key={inquiry._id}
                      className="rounded-3xl border border-slate-200 p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {inquiry.buyer?.firstName}{" "}
                            {inquiry.buyer?.lastName}
                          </p>
                          <p className="mt-2 text-slate-500">
                            {inquiry.property?.title}
                          </p>
                          <p className="mt-3 text-sm text-slate-600">
                            {inquiry.message || "No message provided."}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            inquiry.status === "responded"
                              ? "bg-emerald-100 text-emerald-700"
                              : inquiry.status === "closed"
                                ? "bg-slate-100 text-slate-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>

                      {inquiry.status !== "responded" && (
                        <button
                          onClick={() => {
                            setResponseInquiry(inquiry);
                            setResponseText("");
                          }}
                          className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                        >
                          <Send size={16} />
                          Respond
                        </button>
                      )}

                      {inquiry.response && (
                        <div className="mt-3 rounded-2xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold text-slate-500">
                            Your response
                          </p>
                          <p className="mt-1 text-sm text-slate-700">
                            {inquiry.response}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[36px] bg-blue-600 p-8 text-white shadow-sm">
              <h2 className="text-3xl font-black">Manage Your Listings</h2>
              <p className="mt-4 text-slate-100">
                Keep your portfolio active by updating or adding new homes.
              </p>
              <button
                onClick={() => navigate("/add-property")}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-slate-100"
              >
                Add new property
                <ArrowRight size={18} />
              </button>
            </div>
          </aside>
        </div>

        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={handleDeleteCancel}
            >
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-black text-slate-900">
                    Delete Property
                  </h3>
                  <p className="mt-2 text-slate-500">
                    Are you sure you want to delete this property? This action cannot be undone.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-200 p-6">
                  <button
                    onClick={handleDeleteCancel}
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={deletingId === deleteConfirm}
                    className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {deletingId === deleteConfirm ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editProperty && (
            <motion.div
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setEditProperty(null)}
            >
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-200 p-6">
                  <h3 className="text-2xl font-black text-slate-900">
                    Edit Property
                  </h3>
                  <button
                    onClick={() => setEditProperty(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form
                  onSubmit={handleEditSubmit}
                  className="space-y-5 p-6"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={editForm.title || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Price (₦) *
                      </label>
                      <input
                        type="number"
                        value={editForm.price || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description *
                    </label>
                    <textarea
                      value={editForm.description || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        City
                      </label>
                      <input
                        type="text"
                        value={editForm.city || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, city: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        State
                      </label>
                      <input
                        type="text"
                        value={editForm.state || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, state: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={editForm.bedrooms ?? ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            bedrooms: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        value={editForm.bathrooms ?? ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            bathrooms: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Status
                    </label>
                    <select
                      value={editForm.status || "pending"}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="sold">Sold</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {responseInquiry && (
            <motion.div
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              onClick={() => setResponseInquiry(null)}
            >
              <motion.div
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-200 p-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Respond to Inquiry
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {responseInquiry.buyer?.firstName}{" "}
                      {responseInquiry.buyer?.lastName} —{" "}
                      {responseInquiry.property?.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setResponseInquiry(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form
                  onSubmit={handleRespond}
                  className="p-6"
                >
                  <p className="mb-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    {responseInquiry.message || "No message provided."}
                  </p>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Your response
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={5}
                    className="mb-4 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
                    placeholder="Type your response to the buyer..."
                    required
                  />

                  <button
                    type="submit"
                    disabled={responding}
                    className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {responding ? "Sending..." : "Send Response"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default OwnerDashboard;
