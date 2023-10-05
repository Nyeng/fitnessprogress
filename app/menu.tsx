import { Link } from "@remix-run/react";

export default function App({ }: {}) {
    return (
        <nav className="bg-gradient-to-r from-purple-400">
            <div className="justify-between px-4 py-2 flex justify-end items-center">
                <Link to="/" className="flex items-center text-white hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="8" r="2" />
                        <line x1="8" y1="10" x2="8" y2="14" />
                        <line x1="8" y1="12" x2="10" y2="12" />
                        <line x1="8" y1="14" x2="6" y2="16" />
                        <line x1="8" y1="14" x2="10" y2="16" />
                    </svg>
                    <span className="text-2xl font-bold"> Fitprog</span>

                </Link>
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
            </div>
        </nav>
    );
}