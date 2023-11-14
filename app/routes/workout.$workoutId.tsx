import invariant from "tiny-invariant";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Workout } from "@prisma/client";
import prisma from "prisma/client";


export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.workoutId, "Missing workoutId param from url(?)");

    console.log("Reached workoutId page!")

    const workout = await prisma.workout.findUnique({
        where: {
            id: parseInt(params.workoutId),
        }
    })

    if (!workout) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ workout });
}

export default function CustomWorkout() {
    const { workout } = useLoaderData<{ workout: Workout }>();

    return (

        <>
            <div>
                <h1>{workout.name}</h1>
                <h2>{workout.description}</h2>

                <Link to="/workouts">Go back to workouts</Link>
            </div>
        </>
    );
};

