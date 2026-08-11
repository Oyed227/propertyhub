import {
  Search,
  MapPin,
  Building2,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("city", location);
    if (propertyType) params.set("propertyType", propertyType);
    if (priceRange) params.set("priceRange", priceRange);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative mb-10">
      <div className="mx-auto max-w-7xl px-3">
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full appearance-none bg-transparent text-slate-600 outline-none"
                >
                  <option value="">Any Location</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Ibadan">Ibadan</option>
                </select>

                <ChevronDown size={18} className="text-slate-400" />
              </div>
            </div>


            <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-white hover:shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-xl bg-blue-100 p-2">
                  <Building2 size={18} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Property
                  </p>

                  <h4 className="font-semibold">Property Type</h4>
                </div>
              </div>

              <div className="flex items-center">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full appearance-none bg-transparent text-slate-600 outline-none"
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="mansion">Mansion</option>
                </select>

                <ChevronDown size={18} className="text-slate-400" />
              </div>
            </div>


            <div className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-blue-500 hover:bg-white hover:shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-xl bg-blue-100 p-2">
                  <DollarSign size={18} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Budget
                  </p>

                  <h4 className="font-semibold">Price Range</h4>
                </div>
              </div>

              <div className="flex items-center">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full appearance-none bg-transparent text-slate-600 outline-none"
                >
                  <option value="">Any Price</option>
                  <option value="0-50000000">Under ₦50M</option>
                  <option value="50000000-100000000">₦50M - ₦100M</option>
                  <option value="100000000-250000000">₦100M - ₦250M</option>
                  <option value="250000000-500000000">₦250M - ₦500M</option>
                  <option value="500000000-999999999">₦500M+</option>
                </select>

                <ChevronDown size={18} className="text-slate-400" />
              </div>
            </div>


            <button
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

export default SearchSection;
