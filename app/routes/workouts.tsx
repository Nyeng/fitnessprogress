import { Lap, Workout, WorkoutLap } from "@prisma/client";
import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import prisma from "prisma/client";
import { useState } from "react";
import { useNavigation } from "@remix-run/react";

interface WorkoutWithLaps extends Workout {
    workoutLaps: (WorkoutLap & { lap: Lap })[];
}

export const loader: LoaderFunction = async () => {
    const workouts = await prisma.workout.findMany({
        include: {
            workoutLaps: {
                include: {
                    lap: true,
                },
            },
        },
    });

    var data = json({ workouts });
    return data
};

export default function Training() {
    const { workouts } = useLoaderData<{ workouts: WorkoutWithLaps[] }>();
    const [clickedWorkoutId, setClickedWorkoutId] = useState<number | null>(null);

    return (
        <>
            <div>
                {/* <Outlet></Outlet> */}
                <Link to="/add-workout" className="text-gray-700 hover:text-gray-900">
                    Add Workout
                </Link>
            </div>
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {workouts.map((workout) => (
                    <div
                        key={workout.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                        <Link to="#" className="text-gray-700 hover:text-gray-900">✏️</Link>
                        <Link to="#" className="text-gray-700 hover:text-gray-900 flex">❌</Link>

                        <div
                            onClick={() => setClickedWorkoutId((prev) => (prev === workout.id ? null : workout.id))}
                            className="bg-white rounded-lg shadow-none p-6 hover:bg-gray-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
                        >
                            <h2 className="text-gray-900 font-bold text-lg mb-2">{workout.name}</h2>
                            <p className="text-gray-700 text-base">{workout.description}</p>
                        </div>
                        {clickedWorkoutId === workout.id && (
                            <>
                                <p className="text-gray-700 text-base">Type: {workout.type}</p>
                                <p className="text-gray-700 text-base">Warmup {workout.warmupKm} km</p>
                                <p className="text-gray-700 text-base">Cooldown distance: {workout.cooldownKm} km</p>
                                <h3 className="text-gray-900 font-bold text-base mb-2">Laps</h3>
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
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}