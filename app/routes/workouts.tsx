import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getWorkouts } from "~/data/workouts";
import { Workout } from "~/domain/workout";
import LastWorkout from "./lastworkout";

export const loader = async () => {
    const workouts = await getWorkouts();
    var data = json({ workouts });
    return data
};


export default function App() {

    const { workouts } = useLoaderData<{ workouts: Workout[] }>();

    return (
        <>
            <div className="bg-gray-200 p-4 rounded-lg shadow-md" >
                <h2 className="text-2xl">Workouts</h2>
                <ul className="overflow-y-auto">
                    {workouts.map((workout) => (
                        <li key={workout.id}>
                            <Link to={`/workouts/${workout.id}`} className="text-black hover:text-gray-500 cursor-pointer">{workout.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* Trenger denne slik at workouts.$workoutid arver fra denne */}
                <Outlet />
            </div>
        </>

    );
}
