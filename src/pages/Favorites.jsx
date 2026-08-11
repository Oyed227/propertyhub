import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../services/api";
import { getUser } from "../utils/auth";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1560184897-e9b1b3f59c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-259329608606?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600017071810-0f8d6b6c6c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490423436-8a7d6b3b3f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();
  const navigate = useNavigate();

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await api.get("/api/favorites");
      setFavorites(response.data || []);
    } catch {
      console.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchFavorites();
  }, [user, navigate, fetchFavorites]);

  const handleRemove = async (propertyId) => {
    try {
      await api.delete(`/api/favorites/${propertyId}`);
      setFavorites(favorites.filter((fav) => fav.property?._id !== propertyId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove from favorites");
    }
  };

  return (
    <main className="bg-slate-50 py-24 min-h-screen mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Your Favorites
          </p>

          <h1 className="mt-3 text-5xl font-black text-slate-900">
            Saved Properties
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Properties you mark as favorite will appear here for easy access.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">
            Loading your favorites...
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite, index) => {
              const property = favorite.property;
              const imageUrl =
                property?.images?.[0] ||
                property?.image ||
                FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

              return (
                <div
                  key={favorite._id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={imageUrl}
                    alt={property?.title}
                    onError={(e) => {
                      const fallback = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
                      if (e.target.src !== fallback) {
                        e.target.src = fallback;
                      }
                    }}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      {property?.title}
                    </h3>
                    <p className="text-slate-600">
                      {property?.city}, {property?.state}
                    </p>
                    <p className="mt-4 text-lg font-bold text-blue-600">
                      ₦{property?.price?.toLocaleString?.() || property?.price}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/properties/${property?._id}`}
                        className="flex-1 rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemove(property?._id)}
                        className="rounded-full border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Heart size={20} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <Heart size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-3xl font-black text-slate-900">
              No favorites yet
            </h2>

            <p className="mt-4 text-slate-500">
              Tap the heart icon on a property details page to save homes you
              love.
            </p>

            <Link
              to="/properties"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
            >
              Browse properties
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
