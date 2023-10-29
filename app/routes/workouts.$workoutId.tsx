import invariant from "tiny-invariant";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getWorkout } from "~/data/workouts";
import { useLoaderData } from "@remix-run/react";
import { Workout } from "~/domain/workout";


//Could we change this to add type "Workout" instead of "any"?
export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.workoutId, "Missing workoutId param from url(?)");
    if (!params.workoutId) {
        throw new Response("Not Found", { status: 404 });
    }

    const workout = await getWorkout(params.workoutId);

    if (!workout) {
        throw new Response("Not Found", { status: 404 });
    }


    console.log("Workout before passing from loader:", workout)
    return json({ workout });
}

export default function CustomWorkout() {
    const { workout } = useLoaderData<{ workout: Workout }>();

    const typeMapper: Record<string, string> = {
        "strength": "💪",
        "speed": "🏃‍♂️",
        "threshold": "🏋️‍♂️",
        "interval": "🏃‍♂️",
        "endurance": "🚴‍♂️",
        "recovery": "🧘‍♂️"
    };

    return (
        <div>
            <h2 className="text-lg mb-2">{workout.name} {typeMapper[workout.type]}</h2>
            <p className="text-gray-700">{workout.description}</p>
        </div>
    );
};

