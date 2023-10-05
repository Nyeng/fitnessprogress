import { Link } from "@remix-run/react";

export default function App({ }: {}) {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">My App</h1>
                <ul className="flex">
                    <li className="mr-4">
                        <Link to="/workouts" className="font-bold hover:text-gray-400">
                            Workouts
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to="/#" className="font-bold hover:text-gray-400">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/#" className="font-bold hover:text-gray-400">
                            Upcoming Races
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}