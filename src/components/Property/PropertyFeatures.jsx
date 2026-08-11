import {
  Wifi,
  Shield,
  Dumbbell,
  Waves,
  Car,
  Trees,
  Camera,
  ChefHat,
  Tv,
  BedDouble,
  Check,
} from "lucide-react";

function PropertyFeatures({ property }) {
  // If property has specific amenities, use them; otherwise show default features
  const propertyAmenities = property?.amenities || [];

  const defaultFeatures = [
    {
      icon: <Wifi size={22} />,
      title: "High-Speed WiFi",
    },
    {
      icon: <Shield size={22} />,
      title: "24/7 Security",
    },
    {
      icon: <Dumbbell size={22} />,
      title: "Modern Gym",
    },
    {
      icon: <Waves size={22} />,
      title: "Swimming Pool",
    },
    {
      icon: <Car size={22} />,
      title: "Private Parking",
    },
    {
      icon: <Trees size={22} />,
      title: "Beautiful Garden",
    },
    {
      icon: <Camera size={22} />,
      title: "CCTV Cameras",
    },
    {
      icon: <ChefHat size={22} />,
      title: "Fitted Kitchen",
    },
    {
      icon: <Tv size={22} />,
      title: "Smart Home",
    },
    {
      icon: <BedDouble size={22} />,
      title: "Walk-in Closet",
    },
  ];

  const features =
    propertyAmenities.length > 0
      ? propertyAmenities.map((amenity) => ({
          icon: <Check size={22} />,
          title: amenity,
        }))
      : defaultFeatures;

  return (
    <section className="rounded-4xl bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-black text-slate-900">Property Amenities</h2>

      <p className="mt-3 text-slate-500">
        Everything you need for luxury living.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-blue-600 hover:bg-blue-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                {feature.icon}
              </div>

              <span className="font-semibold text-slate-700">
                {feature.title}
              </span>
            </div>

            <Check className="text-green-500" size={20} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PropertyFeatures;
