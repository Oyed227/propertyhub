import { BedDouble, Bath, Ruler, Car, Star, MapPin } from "lucide-react";

function PropertyInfo({ property }) {
  // Supports both backend (address/city/state) and dummy data (location)
  const location =
    property?.address ||
    [property?.city, property?.state].filter(Boolean).join(", ") ||
    property?.location ||
    "Location not specified";

  // Supports backend numeric price and dummy formatted string
  const price =
    typeof property?.price === "number"
      ? property.price.toLocaleString()
      : property?.price || "Price on request";

  // Supports backend averageRating and dummy rating
  const rating = property?.averageRating || property?.rating || 0;

  // Supports backend squareFootage and dummy area
  const area = property?.squareFootage || property?.area || "N/A";

  // Supports backend views and dummy photos count
  const views = property?.views || property?.photos || 0;

  return (
    <section className="rounded-4xl bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700">
            {property.status}
          </span>

          <h1 className="mt-4 text-4xl font-black text-slate-900">
            {property.title}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-slate-500">
            <MapPin size={18} />
            {location}
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Starting Price
          </p>

          <h2 className="mt-2 text-4xl font-black text-blue-600">
            ₦{price}
          </h2>

          <div className="mt-3 flex items-center justify-end gap-2">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />

            <span className="font-bold">{rating}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl bg-slate-50 p-6 transition hover:bg-blue-50">
          <BedDouble className="text-blue-600" size={24} />

          <h3 className="mt-4 text-2xl font-black">{property.bedrooms}</h3>

          <p className="text-slate-500">Bedrooms</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 transition hover:bg-blue-50">
          <Bath className="text-blue-600" size={24} />

          <h3 className="mt-4 text-2xl font-black">{property.bathrooms}</h3>

          <p className="text-slate-500">Bathrooms</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 transition hover:bg-blue-50">
          <Ruler className="text-blue-600" size={24} />

          <h3 className="mt-4 text-2xl font-black">
            {area}
          </h3>

          <p className="text-slate-500">Floor Area</p>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 transition hover:bg-blue-50">
          <Car className="text-blue-600" size={24} />

          <h3 className="mt-4 text-2xl font-black">{views}</h3>

          <p className="text-slate-500">Views</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-black text-slate-900">
          Property Description
        </h2>

        <p className="mt-5 leading-8 text-slate-600">{property.description}</p>
      </div>
    </section>
  );
}

export default PropertyInfo;
