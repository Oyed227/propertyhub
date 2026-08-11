import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Tag,
  FileText,
  Upload,
  X,
  Save,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../services/api";
import { getUser, isOwner } from "../utils/auth";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1560184897-e9b1b3f59c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-259329608606?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600017071810-0f8d6b6c6c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490423436-8a7d6b3b3f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
];

function AddProperty() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "house",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!isOwner()) {
      toast.error("Owner access required.");
      navigate("/");
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    const limited = files.slice(0, 5);
    setImages(limited);

    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    const urls = limited.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeImage = (index) => {
    const updated = [...images];
    const updatedPreviews = [...previewUrls];
    URL.revokeObjectURL(previewUrls[index]);
    updated.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updated);
    setPreviewUrls(updatedPreviews);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const base64Images = await Promise.all(
        images.map((file) => convertToBase64(file)),
      );

      const response = await api.post("/api/properties", {
        ...formData,
        images: base64Images,
      });

      toast.success("Property listed successfully!");
      navigate("/owner");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Failed to list property. Please try again.";
      console.error("Add property error:", err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <main className="bg-slate-50 min-h-screen py-24 mt-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10 rounded-[36px] bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Add New Listing
          </p>
          <h1 className="mt-4 text-5xl font-black text-slate-900">
            List Your Property
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Fill in the details below to list your property on PropertyHub.
            Upload high-quality images to attract more buyers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[36px] bg-white p-10 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Tag size={18} />
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Luxury Smart Villa"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText size={18} />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Describe your property..."
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Tag size={18} />
                Price (₦) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 450000000"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Home size={18} />
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={18} />
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Full address"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={18} />
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Lagos"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={18} />
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. Lagos State"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={18} />
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 100001"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BedDouble size={18} />
                Bedrooms *
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="1"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 4"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Bath size={18} />
                Bathrooms *
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="1"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 3"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Ruler size={18} />
                Square Footage
              </label>
              <input
                type="number"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleChange}
                min="0"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 520"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Upload size={18} />
                Property Images * (max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-900"
              />
              <p className="mt-2 text-xs text-slate-500">
                Upload up to 5 images. First image will be used as the cover
                photo.
              </p>
            </div>

            {previewUrls.length > 0 && (
              <div className="md:col-span-2">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Image Previews
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative h-32 w-full rounded-2xl"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full rounded-2xl object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/owner")}
              className="rounded-2xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  List Property
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddProperty;
