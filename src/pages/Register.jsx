import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });

      toast.success(response.data.message || "Registration successful.");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please check your backend server and try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">
        <div className="hidden bg-[#020817] p-14 text-white lg:flex lg:flex-col lg:justify-center">
          <h1 className="text-5xl font-black leading-tight">
            Find Your
            <br />
            Dream Home.
          </h1>

          <p className="mt-6 text-slate-300 leading-8">
            Join thousands of buyers and property owners using PropertyHub to
            discover premium homes across Nigeria.
          </p>
        </div>

        <div className="p-10 lg:p-14">
          <h2 className="text-4xl font-black text-slate-900">Create Account</h2>

          <p className="mt-2 text-slate-500">
            Welcome! Fill in your information below.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-4 text-slate-400" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 outline-none focus:border-blue-600"
                  required
                />
              </div>
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600"
            >
              <option value="buyer">Buyer</option>
              <option value="owner">Property Owner</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Already have an account?
            <Link to="/login" className="ml-2 font-semibold text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
