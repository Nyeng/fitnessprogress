import invariant from "tiny-invariant";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getWorkout } from "~/data/workouts";
import { useLoaderData } from "@remix-run/react";
import { Workout } from "~/domain/workout";


//Could we change this to add type "Workout" instead of "any"?
export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    console.log(params.workoutId)
    invariant(params.workoutId, "Missing workoutId param from url(?)");
    if (!params.workoutId) {
        throw new Response("Not Found", { status: 404 });
    }

    const workout = await getWorkout(params.workoutId);

    console.log(workout?.name)
    console.log(workout?.type)
    if(!workout) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ workout });

}


export default function CustomWorkout() {
    const { workout } = useLoaderData<{workout: Workout}>();

    if (!workout) {
        return <div>Loading...</div>;
      }

    return (
        <div id="workout">
            <h1>{workout.name}</h1>
            <p>Type: {workout.type}</p>
            <p>Description: {workout.description}</p>
        </div>
    );
};

