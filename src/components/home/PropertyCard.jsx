import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  ArrowRight,
  Star,
  Heart,
  MessageSquare,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import { getUser } from "../../utils/auth";
import InquiryForm from "../Property/InquiryForm";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1560184897-e9b1b3f59c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-259329608606?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600017071810-0f8d6b6c6c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490423436-8a7d6b3b3f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];

function PropertyCard({ property }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const user = getUser();
  const propertyId = property?._id || property?.id;

  useEffect(() => {
    if (!user || !propertyId) return;
    const checkFavorite = async () => {
      try {
        const res = await api.get("/api/favorites");
        const found = res.data.some(
          (fav) =>
            fav.property?._id === propertyId || fav.property?.id === propertyId,
        );
        setIsFavorite(found);
      } catch {}
    };
    checkFavorite();
  }, [propertyId, user]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    setFavLoading(true);
    try {
      if (isFavorite) {
        await api.delete(`/api/favorites/${propertyId}`);
        toast.success("Removed from Favorites");
      } else {
        await api.post(`/api/favorites/${propertyId}`);
        toast.success("Added to Favorites");
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
    setFavLoading(false);
  };

  const fallbackImage =
    FALLBACK_IMAGES[
      Math.abs((property?._id || property?.id || 0) % FALLBACK_IMAGES.length)
    ];

  const imageSrc = (() => {
    if (property?.image) {
      return property.image;
    }
    if (property?.images && property.images.length > 0) {
      return property.images[0];
    }
    return fallbackImage;
  })();

  const price =
    typeof property?.price === "number"
      ? `₦${property.price.toLocaleString()}`
      : property?.price || "Price on request";

  const rating = property?.averageRating || property?.rating || 0;

  const location =
    property?.address ||
    [property?.city, property?.state].filter(Boolean).join(", ") ||
    property?.location ||
    "Location not specified";

  const area = property?.squareFootage || property?.area || "N/A";

  const propertyType = property?.propertyType || property?.type || "N/A";

  const statusColor = {
    pending: "bg-yellow-500",
    approved: "bg-green-600",
    rejected: "bg-red-600",
    sold: "bg-slate-900",
    Featured: "bg-blue-600",
    New: "bg-emerald-600",
    Premium: "bg-purple-600",
    "For Sale": "bg-indigo-600",
    Luxury: "bg-amber-600",
  };

  return (
    <motion.div
      transition={{ duration: 0.3 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={imageSrc}
          alt={property.title}
          onError={(e) => {
            if (e.target.src !== fallbackImage) {
              e.target.src = fallbackImage;
            }
          }}
          className="h-60 w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`absolute left-4 top-4 rounded-full px-4 py-1 text-xs font-bold uppercase text-white ${
            statusColor[property.status] || "bg-blue-600"
          }`}
        >
          {property.status}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleFavorite}
          disabled={favLoading}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition ${
            isFavorite
              ? "bg-red-600 text-white"
              : "bg-white hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart size={18} className={isFavorite ? "fill-white" : ""} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-white backdrop-blur"
        >
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating}</span>
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <h2 className="line-clamp-2 text-2xl font-bold text-slate-900">
            {property.title}
          </h2>

          <p className="mt-2 text-3xl font-black text-blue-600">{price}</p>

          <div className="mt-2 flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="text-center">
              <BedDouble className="mx-auto text-blue-600" size={18} />
              <p className="mt-2 font-bold">{property.bedrooms}</p>
              <small>Bedrooms</small>
            </div>

            <div className="text-center">
              <Bath className="mx-auto text-blue-600" size={18} />
              <p className="mt-2 font-bold">{property.bathrooms}</p>
              <small>Bathrooms</small>
            </div>

            <div className="text-center">
              <Ruler className="mx-auto text-blue-600" size={18} />
              <p className="mt-2 font-bold">{area}</p>
              <small>Sq Ft</small>
            </div>
          </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
                return;
              }
              setMessageOpen(true);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-600 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <MessageSquare size={16} />
            Message Owner
          </button>

          <Link
            to={`/properties/${propertyId}`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            View Property
            <ArrowRight size={18} />
          </Link>
        </div>
        </div>
      </div>

      <AnimatePresence>
        {messageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setMessageOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Message Owner
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{property.title}</p>
                </div>
                <button
                  onClick={() => setMessageOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <InquiryForm
                  propertyId={propertyId}
                  propertyTitle={property.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PropertyCard;
