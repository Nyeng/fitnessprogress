import { Link } from "@remix-run/react";

export default function App({ }: {}) {
    return (
        <nav className="bg-gradient-to-r from-purple-400">
            <h1 className="text-2xl font-bold">Your fitness progress</h1>
            <ul className="flex">
                <li className="mr-4">
                    <Link to="/workouts" className="hover:text-white hover:bg-purple-600">
                        Workouts
                    </Link>
                </li>
                <li className="mr-4">
                    <Link to="/#" className="hover:text-white hover:bg-purple-600">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/#" className="hover:text-white hover:bg-purple-600">
                        Upcoming Races
                    </Link>
                </li>
            </ul>
        </nav>
    );
}