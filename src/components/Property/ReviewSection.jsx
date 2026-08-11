import { useState, useEffect, useCallback } from "react";
import { Star, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import { getUser } from "../../utils/auth";

function ReviewSection({ propertyId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const user = getUser();

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/api/reviews/${propertyId}`);
      setReviews(response.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to leave a review");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/api/reviews/${propertyId}`, {
        rating: formData.rating,
        comment: formData.comment,
      });

      toast.success("Review posted successfully!");
      setFormData({ rating: 5, comment: "" });
      await fetchReviews();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to post review";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await api.delete(`/api/reviews/${reviewId}`);
      toast.success("Review deleted");
      await fetchReviews();
    } catch {
      toast.error("Failed to delete review");
    }
  };

  return (
    <section className="rounded-3xl bg-white border border-slate-200 p-10 shadow-sm">
      <h2 className="text-3xl font-black text-slate-900 mb-8">Reviews</h2>

      {user && (
        <form
          onSubmit={handleSubmit}
          className="mb-12 rounded-2xl bg-slate-50 p-6"
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: num })}
                  className={`transition ${
                    formData.rating >= num ? "text-amber-400" : "text-slate-300"
                  }`}
                >
                  <Star size={24} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Review
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="Share your experience with this property..."
              rows="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
          >
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-slate-500">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-xl border border-slate-200 p-5 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {review.user?.firstName} {review.user?.lastName}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Star
                        key={num}
                        size={16}
                        className={
                          review.rating >= num
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {user && user._id === review.user?._id && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
              <p className="mt-3 text-slate-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ReviewSection;
