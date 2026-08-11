import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import api from "../services/api";
import PropertyCard from "../components/home/PropertyCard";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80&auto=format&fit=crop",
];

function Properties() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("grid");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [propertyType, setPropertyType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const searchRef = useRef(null);
  const propertyTypeRef = useRef(null);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const city = searchParams.get("city") || "";
    const type = searchParams.get("propertyType") || "All";
    const queryPriceRange = searchParams.get("priceRange") || "All";
    const querySearch = searchParams.get("search") || "";
    const querySort = searchParams.get("sortBy") || "Newest";

    setSearch(querySearch || city);
    setPropertyType(type);
    setPriceRange(queryPriceRange);
    setSortBy(querySort);
  }, [searchParams]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (search.trim() !== "") {
          params.set("search", search.trim());
        }
        if (propertyType !== "All") {
          params.set("propertyType", propertyType);
        }
        if (priceRange !== "All") {
          params.set("priceRange", priceRange);
        }

        switch (sortBy) {
          case "Price Low":
            params.set("sort", "price");
            break;
          case "Price High":
            params.set("sort", "-price");
            break;
          case "Rating":
            params.set("sort", "-averageRating");
            break;
          default:
            params.set("sort", "-createdAt");
            break;
        }

        params.set("limit", "16");

        const { data } = await api.get(`/api/properties?${params.toString()}`);

        const fetchedProperties = (data.properties || []).map(
          (property, index) => ({
            ...property,

            image:
              property.images?.length > 0
                ? property.images[0]
                : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],

            location:
              property.address ||
              `${property.city || ""}, ${property.state || ""}`,

            area: property.squareFootage
              ? `${property.squareFootage} sqft`
              : "N/A",

            garage: property.garage || "2 Cars",

            rating: property.averageRating || 4.8,

            photos: property.images?.length > 0 ? property.images.length : 12,

            agent: property.owner?.firstName
              ? `${property.owner.firstName} ${property.owner.lastName}`
              : "PropertyHub Agent",
          }),
        );

        const approvedProperties = fetchedProperties.filter(
          (p) =>
            p.status === "approved" ||
            p.status === "pending" ||
            p.status === "sold",
        );

        setProperties(approvedProperties);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [search, propertyType, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-t-4 border-blue-600 border-solid border-4 border-blue-600 rounded-full h-12 w-12 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#020817] py-28">
        <div className="mx-auto max-w-7xl px-6 text-center text-white mt-10">
          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
            Premium Collection
          </span>

          <h1 className="mt-8 text-6xl font-black">Find Your Dream Property</h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
            Browse verified apartments, duplexes, villas and luxury homes across
            Nigeria.
          </p>
        </div>
      </section>

      <section className="-mt-14 relative z-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[30px] bg-white p-6 shadow-2xl">
            <div className="grid gap-5 lg:grid-cols-5">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <select
                ref={propertyTypeRef}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600"
              >
                <option value="All">All Properties</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600"
              >
                <option value="Newest">Newest</option>
                <option value="Price Low">Price Low → High</option>
                <option value="Price High">Price High → Low</option>
                <option value="Rating">Highest Rated</option>
              </select>

              <button
                onClick={() => searchRef.current?.focus()}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 font-semibold transition hover:border-blue-600 hover:text-blue-600"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

              <button
                onClick={() => searchRef.current?.focus()}
                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 font-semibold text-white transition hover:bg-slate-900"
              >
                <Search size={18} />
                Live Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {properties.length} Properties Found
            </h2>

            <p className="mt-2 text-slate-500">
              Browse premium homes across Nigeria.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex overflow-hidden rounded-xl border border-slate-200">
              <button
                onClick={() => setView("grid")}
                className={`p-3 transition ${
                  view === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                <Grid3X3 size={18} />
              </button>

              <button
                onClick={() => setView("list")}
                className={`p-3 transition ${
                  view === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto mt-10 max-w-7xl px-6 ${
            view === "grid"
              ? "grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-8"
          }`}
        >
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <h3 className="text-2xl font-bold text-slate-700">
                No Properties Found
              </h3>

              <p className="mt-3 text-slate-500">
                Try searching another location or property type.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Properties;
