import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Building2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser } from "../../utils/auth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dashboardLink, setDashboardLink] = useState(null);
  const navigate = useNavigate();

  const currentUser = getUser();
  const links = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    ...(currentUser ? [{ name: "My Inquiries", path: "/my-inquiries" }] : []),
    { name: "Favorites", path: "/favorites" },
    ...(currentUser?.role === "owner"
      ? [{ name: "Add Property", path: "/add-property" }]
      : []),
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const checkUser = () => {
      const currentUser = getUser();
      setUser(currentUser);

      if (currentUser?.role === "owner") {
        setDashboardLink({ name: "Owner Dashboard", path: "/owner" });
      } else if (currentUser?.role === "admin") {
        setDashboardLink({ name: "Admin Dashboard", path: "/admin" });
      } else {
        setDashboardLink(null);
      }
    };

    checkUser();

    const handleAuthChange = () => checkUser();
    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("propertyHubAuth");
    setUser(null);
    navigate("/");
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05 },
    }),
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-5 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl">
            <div className="flex items-center justify-between h-20 px-8">
              <Link to="/" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg"
                >
                  <Building2 className="text-white" size={24} />
                </motion.div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Property<span className="text-blue-600">Hub</span>
                  </h1>
                  <p className="text-xs text-slate-500 -mt-1">
                    Find Your Dream Home
                  </p>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-10">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navLinkVariants}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative font-medium transition-all duration-300 ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-700 hover:text-blue-600"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.name}
                          <span
                            className={`absolute left-0 -bottom-2 h-0.75 rounded-full bg-blue-600 transition-all duration-300 ${
                              isActive ? "w-full" : "w-0"
                            }`}
                          ></span>
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="hidden lg:flex items-center gap-4 relative">
                {user ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setAccountOpen(true)}
                    onMouseLeave={() => setAccountOpen(false)}
                  >
                    <button
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
                      type="button"
                    >
                      Account
                      <ArrowRight size={18} />
                    </button>

                    <AnimatePresence>
                      {accountOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 z-50 mt-3 w-64 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl"
                        >
                          <div className="space-y-2">
                            {dashboardLink && (
                              <Link
                                to={dashboardLink.path}
                                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                              >
                                {dashboardLink.name}
                              </Link>
                            )}
                            <button
                              onClick={handleLogout}
                              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                              type="button"
                            >
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-slate-700 hover:text-blue-600 font-medium transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg hover:shadow-blue-300"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-slate-700"
              >
                {menuOpen ? <X size={30} /> : <Menu size={30} />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-slate-200"
          >
            <div className="px-8 py-6 space-y-4">
              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                {user ? (
                  <>
                    {dashboardLink && (
                      <NavLink
                        to={dashboardLink.path}
                        onClick={() => setMenuOpen(false)}
                        className="text-lg font-medium transition-colors text-blue-600 hover:text-blue-700"
                      >
                        {dashboardLink.name}
                      </NavLink>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="text-slate-700 hover:text-blue-600 font-medium transition text-left"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-slate-700 hover:text-blue-600 font-medium transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
