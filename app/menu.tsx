import { Link } from "@remix-run/react";
import strava_image from "./images/btn_strava_connectwith_orange@2x.png";



export default function App({ }: {}) {
    return (
        <nav className="bg-gradient-to-r from-pink-200 to-yellow-400 flex items-center">
            <Link to="/" className="hover:text-white hover:text-gray-200 mr-4">
                <span className="text-2xl font-bold">Fitprog</span>
            </Link>
            <Link to="/workouts" className="hover:text-white hover:bg-yellow-600 mr-4">
                Workouts
            </Link>
            <Link to="/strava" className="hover:text-white hover:bg-white-600 mr-4">
                <img src={strava_image} className="ml-2 h-12 w-48" alt="Connect with strava" />
            </Link>
        </nav>
    );
}