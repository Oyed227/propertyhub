import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { getUser } from "../utils/auth";
import api from "../services/api";

function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyId = new URLSearchParams(location.search).get("propertyId");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [propertyTitle, setPropertyTitle] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPropertyDetails = async () => {
    if (!propertyId) return;

    try {
      const { data } = await api.get(`/api/properties/${propertyId}`);
      setPropertyTitle(data?.title || "");
    } catch {
      setPropertyTitle("");
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (propertyId && !getUser()) {
      navigate(
        `/login?redirect=${encodeURIComponent(
          `${location.pathname}${location.search}`,
        )}`,
      );
      return;
    }

    setLoading(true);
    try {
      if (propertyId) {
        await api.post(`/api/inquiries/${propertyId}`, {
          message: `${formData.subject.trim()}\n\n${formData.message.trim()}`,
        });
        toast.success(
          "Inquiry sent to the property owner. They will see your message in their dashboard.",
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Message sent successfully! We'll get back to you soon.");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: ["+234 (0) 123 456 7890", "+234 (0) 987 654 3210"],
      color: "text-blue-600",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: ["support@propertyhub.com", "inquiries@propertyhub.com"],
      color: "text-emerald-600",
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      details: ["123 Property Street", "Lagos, Nigeria, 100001"],
      color: "text-violet-600",
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      color: "text-orange-600",
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-6xl font-black leading-tight mt-10">
            Get in Touch
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Contact our
            friendly team anytime.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-lg transition"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 ${info.color}`}
                >
                  {info.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {info.title}
                </h3>
                <div className="mt-4 space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-slate-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">
              {propertyId ? "Message the Property Owner" : "Send us a Message"}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {propertyId
                ? `Send a message about ${propertyTitle || "this property"} directly to the owner.`
                : "Fill out the form below and we'll respond as soon as possible."}
            </p>
            {propertyId && propertyTitle && (
              <p className="mt-2 text-sm text-slate-500">
                Property: <span className="font-semibold">{propertyTitle}</span>
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-4xl bg-slate-50 p-10 shadow-lg"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 (0) 123 456 7890"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How long does it take to sell a property?",
                a: "The time to sell depends on market conditions, property location, and price. Most properties sell within 30-90 days.",
              },
              {
                q: "Is my personal information secure?",
                a: "Yes, we use industry-standard encryption and security protocols to protect all user data.",
              },
              {
                q: "Can I list multiple properties?",
                a: "Yes, property owners can list as many properties as they want on PropertyHub.",
              },
              {
                q: "What fees do you charge?",
                a: "PropertyHub charges a small listing fee for property owners. Buyer registration is completely free.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-6 cursor-pointer hover:shadow-lg transition group"
              >
                <summary className="flex items-center justify-between font-semibold text-slate-900">
                  {faq.q}
                  <span className="text-blue-600 group-open:rotate-180 transition">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
