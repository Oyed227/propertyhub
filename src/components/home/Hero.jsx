import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="pt-28 pb-1 bg-black mb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold"
            >
              Real Estate Platform
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 text-6xl xl:text-7xl font-black leading-tight"
            >
              <span className="text-white">Find Your</span>

              <br />

              <span className="text-blue-500">Dream Home</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 text-slate-300 text-xl leading-9 max-w-xl"
            >
              Buy, rent and discover premium apartments, duplexes, villas and
              commercial properties across Nigeria.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 bg-white rounded-3xl p-4 shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <MapPin className="text-gray-400" size={28} />

                <input
                  placeholder="Search by city or location..."
                  className="outline-none text-lg w-full"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl text-white flex items-center gap-3"
              >
                <Search size={20} />
                Search
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
              alt="Luxury House"
              className="rounded-3xl object-cover h-screen w-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-8 left-8 bg-white rounded-2xl px-6 py-4 shadow-xl"
            >
              <p className="text-gray-500 text-sm">Featured Property</p>

              <h3 className="font-bold text-xl">₦250,000,000</h3>

              <p className="text-gray-600">5 Bedroom Detached Duplex</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
