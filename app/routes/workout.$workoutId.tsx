import invariant from "tiny-invariant";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Lap, Workout, WorkoutLap } from "@prisma/client";
import prisma from "prisma/client";


interface WorkoutWithLaps extends Workout {
    workoutLaps: (WorkoutLap & { lap: Lap })[];
}

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.workoutId, "Missing workoutId param from url(?)");

    console.log("Reached workoutId page!")

    const workout = await prisma.workout.findUnique({
        where: {
            id: parseInt(params.workoutId),
        },
        include: {
            workoutLaps: {
                include: {
                    lap: true,
                },
            },
        },
    })

    if (!workout) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ workout });
}

export default function CustomWorkout() {
    const { workout } = useLoaderData<{ workout: WorkoutWithLaps }>();

    return (

        <>
            <div>
                <Link to="#" className="text-gray-700 hover:text-gray-900">✏️ Modify workout</Link>
                <Link to="#" className="text-gray-700 hover:text-gray-900 flex">❌ Delete workout</Link>

                <p></p>
                <h2 className="text-gray-900 font-bold text-lg mb-2">{workout.name}</h2>
                <p className="text-gray-700 text-base">{workout.description}</p>

                <>
                    <p className="text-gray-700 text-base">Type: {workout.type}</p>
                    <p className="text-gray-700 text-base">Warmup {workout.warmupKm} km</p>
                    <p className="text-gray-700 text-base">Cooldown distance: {workout.cooldownKm} km</p>
                    <h3 className="text-gray-900 font-bold text-base mb-2">Laps</h3>
                    {workout.workoutLaps && workout.workoutLaps.length > 0 ? (
                        <ul>
                            {workout.workoutLaps.map((workoutLap) => (
                                <li key={`${workout.id}-${workoutLap.lapId}`}>
                                    <div
                                        key={workout.id - workoutLap.lapId}
                                        className="bg-gray-100 rounded-lg shadow-md p-4 mt-4"
                                    >
                                        <p className="text-gray-900 font-bold text-base mb-2">
                                            {workoutLap.lap.lapDescription}
                                        </p>
                                        <p className="text-gray-700 text-base">Repeats: {workoutLap.repeats}</p>
                                        <p className="text-gray-700 text-base">Break: {workoutLap.lap.lapBreakInSeconds}</p>
                                        <p className="text-gray-700 text-base">Minutes{" "}
                                            {workoutLap.lap.lapSeconds ? workoutLap.lap.lapSeconds / 60 : 0}{" "}
                                        </p>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No laps found.</p>
                    )}
                </>
            </div>
        </>
    );
};


