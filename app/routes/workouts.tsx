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
        <div id="workouts">
            <h2>Workouts</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Trenger denne slik at workouts.$workoutid arver fra denne */}
            <Outlet />
        </div>

    );
}
