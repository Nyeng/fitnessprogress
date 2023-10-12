import invariant from "tiny-invariant";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getWorkout } from "~/data/workouts";
import { Outlet, useLoaderData } from "@remix-run/react";
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

    return json({ workout });

}


export default function CustomWorkout() {
    const { workout } = useLoaderData<{ workout: Workout }>();

    return (
        <><div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-lg mb-2">{workout.type}</p>
            <p className="text-gray-700">{workout.description}</p>
        </div></>

    );
};

