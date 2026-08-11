import {
  Building2,
  Home,
  Hotel,
  Castle,
  ArrowRight,
  Warehouse,
} from "lucide-react";

const categories = [
  {
    title: "Apartments",
    homes: "340 Properties",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Luxury Villas",
    homes: "128 Properties",
    icon: Home,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Duplex",
    homes: "95 Properties",
    icon: Hotel,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Mansions",
    homes: "52 Properties",
    icon: Castle,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Commercial",
    homes: "86 Properties",
    icon: Warehouse,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Land",
    homes: "220 Properties",
    icon: Building2,
    color: "bg-green-100 text-green-600",
  },
];

function PropertyCategories() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Categories
          </span>

          <h2 className="mt-6 text-5xl font-black text-slate-900">
            Browse By Property Type
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            Find the perfect property that suits your lifestyle and budget.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group cursor-pointer rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-600 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon size={30} />
                  </div>

                  <ArrowRight
                    size={22}
                    className="text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-500">{item.homes}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PropertyCategories;
