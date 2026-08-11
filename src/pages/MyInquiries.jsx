import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Clock3, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../services/api";
import { getUser } from "../utils/auth";

const MyInquiries = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/api/inquiries/buyer");
        setInquiries(data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "responded":
        return { bg: "bg-emerald-100 text-emerald-700", label: "Responded", icon: <CheckCircle size={14} />, dot: "bg-emerald-500" };
      case "closed":
        return { bg: "bg-slate-100 text-slate-700", label: "Closed", icon: <XCircle size={14} />, dot: "bg-slate-400" };
      default:
        return { bg: "bg-amber-100 text-amber-700", label: "Pending", icon: <Clock3 size={14} />, dot: "bg-amber-500" };
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen py-24 mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 rounded-[36px] bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            My Inquiries
          </p>
          <h1 className="mt-4 text-5xl font-black text-slate-900">
            Messages to Owners
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Track every inquiry you have sent and read owner responses here.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-slate-500">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-slate-500">You have not sent any inquiries yet.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {inquiries.map((inquiry) => {
              const badge = getStatusBadge(inquiry.status);

              return (
                <motion.div
                  key={inquiry._id}
                  layout
                  className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badge.bg}`}
                        >
                          <span className={`h-2 w-2 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </span>

                        <span className="text-xs text-slate-400">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-slate-900">
                        {inquiry.property?.title || "Unknown Property"}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Owner: {inquiry.owner?.firstName} {inquiry.owner?.lastName}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Property: ₦{inquiry.property?.price?.toLocaleString?.() || inquiry.property?.price || "N/A"} — {inquiry.property?.city || ""}, {inquiry.property?.state || ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                    <p className="text-xs font-semibold text-slate-500">Your message</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {inquiry.message || "No message provided."}
                    </p>
                  </div>

                  {inquiry.response ? (
                    <div className="mt-4 rounded-2xl bg-blue-50 p-5">
                      <p className="text-xs font-semibold text-blue-700">Owner response</p>
                      <p className="mt-2 text-sm text-slate-800">{inquiry.response}</p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-5">
                      <p className="text-sm text-slate-500">
                        The owner has not responded yet. You will see their reply here once they respond.
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyInquiries;
