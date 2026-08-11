import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", formData);
      const authData = {
        token: response.data.token,
        user: response.data.user,
      };
      localStorage.setItem("propertyHubAuth", JSON.stringify(authData));
      window.dispatchEvent(new Event("auth-change"));
      toast.success("Login successful");
      navigate(redirect || "/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your backend server and try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">
        <div className="hidden bg-[#020817] p-14 text-white lg:flex lg:flex-col lg:justify-center">
          <h1 className="text-5xl font-black leading-tight">
            Welcome Back.
            <br />
            Login to Your Account.
          </h1>
          <p className="mt-6 text-slate-300 leading-8">
            Access your favorite properties and saved searches instantly.
          </p>
        </div>

        <div className="p-10 lg:p-14">
          <h2 className="text-4xl font-black text-slate-900">Login</h2>
          <p className="mt-2 text-slate-500">
            Enter your email and password to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            New to PropertyHub?
            <Link to="/register" className="ml-2 font-semibold text-blue-600">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
