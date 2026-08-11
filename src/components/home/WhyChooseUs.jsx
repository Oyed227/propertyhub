import {
  ShieldCheck,
  Building2,
  BadgeDollarSign,
  Users,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    id: "01",
    title: "Verified Properties",
    description:
      "Every property is reviewed and verified before it goes live, ensuring buyers only browse authentic listings.",
    icon: Building2,
  },
  {
    id: "02",
    title: "Trusted Agents",
    description:
      "Connect with experienced real estate professionals committed to making your buying journey stress-free.",
    icon: Users,
  },
  {
    id: "03",
    title: "Best Market Prices",
    description:
      "Compare premium homes across Nigeria with competitive pricing and transparent information.",
    icon: BadgeDollarSign,
  },
  {
    id: "04",
    title: "Secure Transactions",
    description:
      "Your enquiries and transactions are protected with modern security practices and verified listings.",
    icon: ShieldCheck,
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Why PropertyHub
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900">
            Why Thousands Trust
            <span className="text-blue-600"> PropertyHub</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            We simplify buying, selling and renting properties through trusted
            listings, professional agents and a secure platform.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-600 hover:shadow-xl"
              >
                {/* Number */}

                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition duration-300 group-hover:bg-blue-600">
                    <Icon
                      size={30}
                      className="text-blue-600 transition duration-300 group-hover:text-white"
                    />
                  </div>

                  <span className="text-5xl font-black text-slate-100">
                    {feature.id}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-500">
                  {feature.description}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-4">
                  Learn More
                  <ArrowUpRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
