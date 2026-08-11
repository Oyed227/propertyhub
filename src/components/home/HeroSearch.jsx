import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

function HeroSearch() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (query) params.set("search", query.trim());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative -mt-20 z-30 px-6 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[30px] border border-white/40 bg-white/90 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_220px]">
            <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-white hover:shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-xl bg-blue-100 p-2">
                  <MapPin size={18} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Location
                  </p>

                  <h4 className="font-semibold">Choose City</h4>
                </div>
              </div>

              <div className="flex items-center">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full appearance-none bg-transparent text-slate-600 outline-none"
                >
                  <option value="">Any Location</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Ibadan">Ibadan</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-2 flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by city, neighborhood, or property..."
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <Search
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.03] hover:from-slate-900 hover:to-slate-800"
            >
              <Search size={21} className="transition group-hover:rotate-12" />
              Search Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
