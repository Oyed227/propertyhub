import { Building2, Send, ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020817] text-white">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 p-10 lg:flex lg:items-center lg:justify-between"
        >
          <div>
            <h2 className="text-4xl font-black">
              Ready To Find Your Dream Home?
            </h2>

            <p className="mt-4 max-w-xl text-blue-100 leading-8">
              Browse verified luxury properties across Nigeria and connect
              directly with trusted agents.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-8 rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 transition lg:mt-0"
          >
            Explore Properties
          </motion.button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
          className="grid gap-16 lg:grid-cols-4"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600"
              >
                <Building2 size={28} />
              </motion.div>

              <div>
                <h2 className="text-2xl font-black">PropertyHub</h2>

                <p className="text-sm text-slate-400">Luxury Real Estate</p>
              </div>
            </div>

            <p className="mt-6 leading-8 text-slate-400">
              PropertyHub helps buyers and sellers discover verified luxury
              properties with confidence.
            </p>

            <motion.div
              className="mt-8 flex gap-3"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter].map(
                (Icon, index) => (
                  <motion.button
                    key={index}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 transition-all duration-300 hover:bg-blue-600"
                  >
                    <Icon />
                  </motion.button>
                ),
              )}
            </motion.div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3 className="mb-7 text-xl font-bold">Company</h3>

            <ul className="space-y-4 text-slate-400">
              {["About Us", "Properties", "Agents", "Contact", "Blog"].map(
                (item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 10 }}
                    className="cursor-pointer transition hover:text-white"
                  >
                    {item}
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3 className="mb-7 text-xl font-bold">Contact</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 text-blue-500" />

                <p className="text-slate-400">
                  25 Admiralty Way,
                  <br />
                  Lekki Phase 1,
                  <br />
                  Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-blue-500" />

                <span className="text-slate-400">+234 800 000 0000</span>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-blue-500" />

                <span className="text-slate-400">hello@propertyhub.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3 className="mb-7 text-xl font-bold">Stay Updated</h3>

            <p className="leading-8 text-slate-400">
              Subscribe to receive exclusive listings and market updates.
            </p>

            <div className="mt-6 flex overflow-hidden rounded-2xl bg-slate-900">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-5 outline-none"
              />

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-blue-600 p-4 transition hover:bg-blue-700"
              >
                <Send size={18} />
              </motion.button>
            </div>

            <motion.div className="mt-8 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-xl border border-slate-700 px-5 py-3 transition hover:border-blue-600"
              >
                <FaApple />
                App Store
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-xl border border-slate-700 px-5 py-3 transition hover:border-blue-600"
              >
                <FaGooglePlay />
                Play Store
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="my-12 h-px bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500"
          >
            © {new Date().getFullYear()} PropertyHub. All Rights Reserved.
          </motion.p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 transition"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
