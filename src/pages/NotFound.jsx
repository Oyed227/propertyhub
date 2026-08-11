import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="bg-slate-50 min-h-screen flex items-center justify-center py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="text-9xl font-black text-blue-600">404</div>

        <h1 className="mt-6 text-4xl font-black text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <Home size={20} />
            Go to Homepage
          </Link>

          <Link
            to="/properties"
            className="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Search size={20} />
            Browse Properties
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
