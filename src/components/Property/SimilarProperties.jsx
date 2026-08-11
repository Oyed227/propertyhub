import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import PropertyCard from "../home/PropertyCard";
import api from "../../services/api";

function SimilarProperties({ currentId }) {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSimilar = useCallback(async () => {
    try {
      const { data } = await api.get("/api/properties?limit=10");
      const allProperties = data.properties || [];
      const approved = allProperties.filter(
        (p) => p.status === "approved" || p.status === "sold" || p.status === "pending",
      );
      const filtered = approved.filter(
        (property) => (property._id || property.id) !== currentId,
      );
      setSimilar(filtered.slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch similar properties:", err);
      setSimilar([]);
    } finally {
      setLoading(false);
    }
  }, [currentId]);

  useEffect(() => {
    fetchSimilar();
  }, [fetchSimilar]);

  return (
    <section className="mt-24 px-6 pb-20 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
              You May Also Like
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900">
              Similar Properties
            </h2>

            <p className="mt-4 max-w-xl text-slate-500">
              Explore more premium homes carefully selected based on your
              interests.
            </p>
          </div>

          <Link
            to="/properties"
            className="hidden items-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold transition hover:border-blue-600 hover:bg-blue-600 hover:text-white lg:flex"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">
            Loading similar properties...
          </p>
        ) : similar.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {similar.map((property) => (
              <PropertyCard
                key={property._id || property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            No similar properties found.
          </p>
        )}
      </div>
    </section>
  );
}

export default SimilarProperties;
