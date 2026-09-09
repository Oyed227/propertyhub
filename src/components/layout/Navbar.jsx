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
                whileTap={{ scale: 0.92 }}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                className="lg:hidden flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:border-blue-500 hover:text-blue-600"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px]"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 h-full w-[88vw] max-w-sm overflow-y-auto border-l border-slate-200 bg-white/95 shadow-2xl shadow-slate-900/20 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Menu
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    PropertyHub
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 px-5 py-6">
                <nav className="space-y-2">
                  {links.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${
                          isActive
                            ? "bg-blue-50 text-blue-600 shadow-sm"
                            : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      <ArrowRight size={16} className="opacity-70" />
                    </NavLink>
                  ))}
                </nav>

                <div className="space-y-3 border-t border-slate-200 pt-5">
                  {user ? (
                    <>
                      {dashboardLink && (
                        <NavLink
                          to={dashboardLink.path}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-2xl bg-slate-900 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
                        >
                          {dashboardLink.name}
                        </NavLink>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-base font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-2xl bg-blue-600 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
