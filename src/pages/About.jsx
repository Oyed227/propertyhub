import { Users, Target, Heart, Award, ArrowRight } from "lucide-react";

function About() {
  const values = [
    {
      icon: <Target size={24} />,
      title: "Our Mission",
      description:
        "To revolutionize the property market by connecting buyers, sellers, and landlords through a transparent, user-friendly platform.",
    },
    {
      icon: <Heart size={24} />,
      title: "Integrity",
      description:
        "We believe in honest dealings and transparent transactions in every property listing and interaction.",
    },
    {
      icon: <Award size={24} />,
      title: "Excellence",
      description:
        "We strive to provide the best service quality and support to all users on our platform.",
    },
    {
      icon: <Users size={24} />,
      title: "Community",
      description:
        "Building a trusted community where property seekers and owners can connect confidently.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Properties" },
    { number: "5K+", label: "Happy Users" },
    { number: "100+", label: "Cities Covered" },
    { number: "1M+", label: "Monthly Visits" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-6xl font-black leading-tight mt-5">
            About PropertyHub
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
            Nigeria's most trusted property marketplace connecting buyers,
            sellers, and renters with their perfect homes.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-10 shadow-lg">
              <h2 className="text-3xl font-black text-slate-900">
                Our Mission
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                To revolutionize the property market by providing a transparent,
                secure, and user-friendly platform where buyers, sellers, and
                property owners can connect and transact with confidence.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-lg">
              <h2 className="text-3xl font-black text-slate-900">Our Vision</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                To become Nigeria's leading property marketplace, making home
                ownership and property investment accessible and enjoyable for
                everyone, across all cities and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">
              Our Core Values
            </h2>
            <p className="mt-4 text-xl text-slate-500">
              What drives everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center hover:shadow-lg transition"
              >
                <div className="flex justify-center text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-4 text-slate-600 leading-6">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">
              By The Numbers
            </h2>
            <p className="mt-4 text-xl text-slate-500">PropertyHub in 2025</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white border border-slate-200 p-10 text-center shadow-sm"
              >
                <div className="text-5xl font-black text-blue-600">
                  {stat.number}
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-16">
            Who We Serve
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 p-10">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Buyers</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Browse verified listings
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Direct contact with sellers
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Save favorite properties
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Secure inquiry system
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-10">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                Property Owners
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  List properties easily
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Manage inquiries
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Track property status
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Reach qualified buyers
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-violet-50 to-violet-100 border border-violet-200 p-10">
              <h3 className="text-2xl font-bold text-violet-900 mb-4">
                Agents & Admins
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                  Approve listings
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                  Platform management
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                  View analytics
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                  Support users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <div className="rounded-4xl bg-linear-to-r from-blue-600 to-blue-700 p-16 text-white">
            <h2 className="text-4xl font-black">
              Ready to Find Your Dream Home?
            </h2>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied users who have found their perfect
              property on PropertyHub.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a
                href="/properties"
                className="inline-flex items-center gap-2 rounded-full bg-white text-blue-600 px-8 py-4 font-bold hover:bg-slate-100 transition"
              >
                Browse Properties
                <ArrowRight size={20} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white text-white px-8 py-4 font-bold hover:bg-white/10 transition"
              >
                Get in Touch
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
