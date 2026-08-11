import { useEffect, useState, useCallback } from "react";
import { Heart, Share2, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import { getUser } from "../../utils/auth";
import { getPropertyImage } from "../../utils/images";

function PropertyGallery({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = getUser();

  const propertyId = property?._id || property?.id;

  const [currentImage, setCurrentImage] = useState(() =>
    getPropertyImage(property),
  );

  useEffect(() => {
    const img = getPropertyImage(property);
    setCurrentImage(img);
  }, [property]);

  const fallbackImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    console.log("PropertyGallery property:", property);
    console.log("PropertyGallery image:", currentImage);
  }, [property, currentImage]);

  const location =
    property?.address ||
    `${property?.city || ""}${property?.city && property?.state ? ", " : ""}${property?.state || ""}` ||
    property?.location ||
    "Location not specified";

  const price =
    typeof property?.price === "number"
      ? `₦${property.price.toLocaleString()}`
      : property?.price;

  const rating = property?.averageRating || property?.rating || 0;

  const checkIfFavorite = useCallback(async () => {
    try {
      const response = await api.get("/api/favorites");

      const found = response.data.some(
        (fav) =>
          fav.property?._id === propertyId || fav.property?.id === propertyId,
      );

      setIsFavorite(found);
    } catch (err) {
      console.log(err);
    }
  }, [propertyId]);

  useEffect(() => {
    if (user && propertyId) {
      checkIfFavorite();
    }
  }, [propertyId, checkIfFavorite, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!propertyId) {
      toast.error("Property ID not found");
      return;
    }

    setLoading(true);

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

    setLoading(false);
  };

  return (
    <section className="relative">
      <div className="relative h-[75vh] overflow-hidden">
        <img
          src={currentImage}
          alt={property.title}
          onError={() => setCurrentImage(fallbackImage)}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/10" />

        <div className="absolute right-8 top-8 flex gap-3">
          <button
            onClick={toggleFavorite}
            disabled={loading}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
              isFavorite
                ? "bg-red-600 text-white"
                : "bg-white/90 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Heart size={20} className={isFavorite ? "fill-white" : ""} />
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 hover:bg-slate-900 hover:text-white transition">
            <Share2 size={20} />
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
          <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
            {property.status}
          </span>

          <h1 className="mt-5 text-5xl font-black text-white">
            {property.title}
          </h1>

          <p className="mt-3 text-lg text-white/80">{location}</p>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-white">{price}</h2>

              <p className="text-white/80 mt-2">⭐ {rating}</p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-black/40 px-5 py-3 text-white backdrop-blur">
              <Camera size={18} />
              {property?.images?.length || property?.photos || 1} Photos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyGallery;
