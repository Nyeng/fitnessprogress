import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getWorkouts } from "~/data/workouts";
import { Workout } from "~/domain/workout";

export const loader = async () => {
    const workouts = await getWorkouts();
    var data = json({ workouts });
    return data
};


export default function App() {

    const { workouts } = useLoaderData<{ workouts: Workout[] }>();

    return (

        // <div className="bg-gray-100 p-4 rounded-lg shadow-md">

        <div className="bg-gray-200 p-4 rounded-lg shadow-md" >
            <ul className="flex-col max-h-40 sm:max-h-24 md:max-h-40 overflow-y-auto">
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <Link to={`/workouts/${workout.id}`} className="text-black hover:text-gray-500 cursor-pointer">{workout.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Trenger denne slik at workouts.$workoutid arver fra denne */}
            <Outlet />
        </div>

    );
}
