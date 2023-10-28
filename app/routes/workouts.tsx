import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getWorkouts } from "~/data/workouts";
import { Workout } from "~/domain/workout";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {

    const workouts = await getWorkouts();
    var data = json({ workouts });
    // todo: return activities here instead of data
    return data
};

export default function Training() {
    const { workouts } = useLoaderData<{ workouts: Workout[] }>();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div>
                <button type="button" onClick={() => setShowMenu(!showMenu)} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    Select workout
                </button>
            </div>

            {showMenu && (
                <div className="absolute z-10 bg-gray-200">
                    {workouts.map((workout) => (
                        <Link key={workout.id} to={`/workouts/${workout.id}`} prefetch="viewport" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" preventScrollReset onClick={() => setShowMenu(false)}>{workout.name}</Link>
                    ))}
                </div>
            )}
            <Outlet />
        </>
    );
}
