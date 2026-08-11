import {
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

function AgentCard({ property }) {
  const ownerName = property.owner
    ? `${property.owner.firstName || ""} ${property.owner.lastName || ""}`.trim() ||
      "PropertyHub Agent"
    : "PropertyHub Agent";

  const ownerId = property.owner?._id || property.owner?.id || ownerName;

  return (
    <aside className="sticky top-28 h-fit">
      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-linear-to-br from-blue-600 to-sky-500 p-8 text-center text-white">
          <img
            src={`https://i.pravatar.cc/200?u=${ownerId}`}
            alt={ownerName}
            className="mx-auto h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <h2 className="mt-5 text-2xl font-black">{ownerName}</h2>

          <p className="mt-1 text-blue-100">Senior Property Consultant</p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
            <ShieldCheck size={16} />
            Verified Agent
          </div>
        </div>

        <div className="space-y-4 p-8">
          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-slate-900">
            <Phone size={20} />
            Call Agent
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700">
            <MessageCircle size={20} />
            WhatsApp
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 py-4 font-semibold transition hover:bg-slate-100">
            <Mail size={20} />
            Send Email
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-blue-600 py-4 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
            <CalendarDays size={20} />
            Schedule Visit
          </button>
        </div>

        <div className="border-t border-slate-200 p-6">
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-bold text-slate-900">120+</p>

              <p className="text-slate-500">Listings</p>
            </div>

            <div>
              <p className="font-bold text-slate-900">4.9★</p>

              <p className="text-slate-500">Rating</p>
            </div>

            <div>
              <p className="font-bold text-slate-900">8 Years</p>

              <p className="text-slate-500">Experience</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AgentCard;
