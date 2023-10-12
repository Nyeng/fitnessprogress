import { Link } from "@remix-run/react";

export default function App({ }: {}) {
    return (
        <nav className="bg-gradient-to-r from-purple-400">
                <Link to="/" className="hover:text-white hover:text-gray-200 mr-4">
                    <span className="text-2xl font-bold">Fitprog</span>
                </Link>
                <Link to="/workouts" className="hover:text-white hover:bg-purple-600 mr-4">
                    Workouts
                </Link>
                <Link to="/strava" className="hover:text-white hover:bg-purple-600 mr-4">
                    Strava
                </Link>

        </nav>

    );
}