import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getUser } from "../../utils/auth";

function InquiryForm({ propertyId, propertyTitle }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate(`/login?redirect=/properties/${propertyId}`);
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/api/inquiries/${propertyId}`, { message });
      toast.success(
        "Inquiry sent successfully! The agent will contact you soon.",
      );
      setMessage("");
      setTimeout(() => {
        navigate("/my-inquiries");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-4xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <MessageCircle size={24} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Send an Inquiry</h2>
      </div>

      <p className="mb-6 text-slate-600">
        Interested in{" "}
        <span className="font-semibold text-slate-900">{propertyTitle}</span>?
        Fill out the form below and the property agent will get back to you
        shortly.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here... (e.g. scheduling a viewing, asking about price, etc.)"
          rows={5}
          className="w-full resize-y rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send size={18} />
              Send Inquiry
            </>
          )}
        </button>
      </form>
    </section>
  );
}

export default InquiryForm;
