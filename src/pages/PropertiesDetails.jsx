import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { MessageCircle } from "lucide-react";

import api from "../services/api";

import PropertyGallery from "../components/Property/PropertyGallery";
import PropertyInfo from "../components/Property/PropertyInfo";
import PropertyFeatures from "../components/Property/PropertyFeatures";
import SimilarProperties from "../components/Property/SimilarProperties";
import ReviewSection from "../components/Property/ReviewSection";
import InquiryForm from "../components/Property/InquiryForm";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProperty = useCallback(async () => {
    try {
      const { data } = await api.get(`/api/properties/${id}`);
      setProperty(data);
    } catch {
      setProperty(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">Loading Property...</h1>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-5xl font-black">Property Not Found</h1>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 pb-20 pt-20 mt-10 px-3">
      <PropertyGallery property={property} />

      <div className="mx-auto mt-8 max-w-7xl px-6">
        <Link
          to="/favorites"
          className="inline-flex rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-slate-900"
        >
          View Saved Favorites
        </Link>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <PropertyInfo property={property} />

          <PropertyFeatures property={property} />

          <ReviewSection propertyId={property._id} />
        </div>

        <div className="space-y-6">
          <div id="message-owner-form">
            <InquiryForm
              propertyId={property._id}
              propertyTitle={property.title}
            />
          </div>

          <section className="rounded-4xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MessageCircle size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Message the Owner
                </h2>
                <p className="text-sm text-slate-500">
                  Have a question about this property? Send a direct message to
                  the owner through the inquiry form above.
                </p>
              </div>
            </div>

            <p className="text-slate-600">
              Use the inquiry form to request a viewing, ask about availability,
              or get a quick response from the owner.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#message-owner-form"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
              >
                Go to Message Owner
              </a>
              <Link
                to={`/contact?propertyId=${property._id}`}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                Message Owner via Contact Page
              </Link>
            </div>
          </section>
        </div>
      </div>

      <SimilarProperties currentId={property._id} />
    </main>
  );
}

export default PropertyDetails;
