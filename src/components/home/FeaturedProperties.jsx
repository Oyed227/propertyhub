import { ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../home/PropertyCard";
import api from "../../services/api";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeatured = useCallback(async () => {
    try {
      const { data } = await api.get("/api/properties?limit=8");
      // Backend returns a paginated response: { total, page, pages, results, properties }
      const allProperties = data.properties || [];
      const approved = allProperties.filter(
        (p) =>
          p.status === "approved" ||
          p.status === "sold" ||
          p.status === "pending",
      );
      setProperties(approved.slice(0, 8)); // Show up to 8 on home page
    } catch (err) {
      console.error("Failed to fetch featured properties:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 py-24">
      <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-50"></div>

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-50 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Featured Collection
            </span>

            <h2 className="mt-5 text-5xl font-black leading-tight text-slate-900">
              Find Your Perfect
              <span className="text-blue-600"> Dream Home</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Browse our carefully selected premium homes located in Nigeria's
              most desirable neighbourhoods.
            </p>
          </div>

          <a
            href="/properties"
            className="flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-slate-900"
          >
            View All Properties
            <ArrowRight size={18} />
          </a>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4"
        >
          {loading ? (
            <p className="col-span-full text-center text-slate-500">
              Loading featured properties...
            </p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <motion.div
                key={property._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500">
              No featured properties available at the moment.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProperties;
