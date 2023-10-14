import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getWorkouts } from "~/data/workouts";
import { Workout } from "~/domain/workout";
import LastWorkout from "./workouts.lastworkout";
import { useState } from "react";

export const loader = async () => {
    const workouts = await getWorkouts();
    var data = json({ workouts });
    return data
};



export default function App() {

    const { workouts } = useLoaderData<{ workouts: Workout[] }>();
    const [showMenu, setShowMenu] = useState(false);

    return (

        <>
            <LastWorkout />

            {/* Trenger denne slik at workouts.$workoutid arver fra denne */}
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="relative inline-block text-left">
                    <div>
                        <button type="button" onClick={() => setShowMenu(!showMenu)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            Select workout
                        </button>
                    </div>

                    {showMenu && (
                        <div className="origin-top-right relative right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-1/2 transform -translate-x-1/2">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {workouts.map((workout) => (
                                    <Link key={workout.id} to={`/workouts/${workout.id}`} prefetch="viewport" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{workout.name}</Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Outlet />
        </>


    );
}
