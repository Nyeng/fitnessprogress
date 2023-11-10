import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getWorkouts } from "~/data/workouts";
import { Workout } from "~/domain/workout";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {

    const workouts = await getWorkouts();
    var data = json({ workouts });
    return data
};

export default function Training() {
    const { workouts } = useLoaderData<{ workouts: Workout[] }>();

    return (
        <>
            <div>
                <table>
                    <tr>
                        <th>Workout Name</th>
                        <th>Workout Type</th>
                    </tr>

                    {workouts.map((workout) => (
                        <tr>

                            <td><Link to={workout.id}>{workout.name} </Link></td>
                            <td>{workout.type}</td>
                        </tr>
                    ))}
                </table>
                <Outlet />
            </div >

        </>
    );
}
