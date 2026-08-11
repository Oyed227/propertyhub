import { Home, Users, MapPinned, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function HeroStats() {
  const stats = [
    {
      icon: <Home size={32} />,
      number: "15K+",
      title: "Luxury Properties",
      text: "Verified homes across Nigeria",
    },
    {
      icon: <Users size={32} />,
      number: "8K+",
      title: "Happy Clients",
      text: "Families found their dream homes",
    },
    {
      icon: <MapPinned size={32} />,
      number: "36+",
      title: "Cities Covered",
      text: "Expanding every single month",
    },
  ];

  return (
    <section className="relative z-20 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white rounded-[30px] p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  {stat.icon}
                </div>

                <ArrowUpRight
                  size={22}
                  className="text-gray-300 group-hover:text-blue-600 transition"
                />
              </div>

              <h2 className="mt-8 text-5xl font-black text-slate-900">
                {stat.number}
              </h2>

              <h3 className="mt-3 text-xl font-semibold text-slate-800">
                {stat.title}
              </h3>

              <p className="mt-2 text-slate-500 leading-7">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroStats;
