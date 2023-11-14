import { WorkoutType } from "@prisma/client";
import { ActionFunction, redirect } from "@remix-run/node";
import prisma from "prisma/client";
import { useState } from "react";

interface LapData {
    lapDescription: string;
    lapSeconds: number | null;
    lapDistance: number | null;
    lapBreakInSeconds: number | null;
    repeats: number;
}

export const action: ActionFunction = async ({ request }) => {


    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as WorkoutType;
    const description = formData.get("description") as string;
    const warmupKm = formData.get("warmupKm") as string;
    const cooldownKm = formData.get("cooldownKm") as string;

    let lapsData: LapData[] = [];
    for (let i = 1; formData.has(`lapDescription${i}`); i++) {
        const lapDescription = formData.get(`lapDescription${i}`) as string;
        const lapSeconds = formData.get(`lapSeconds${i}`) as string;
        const lapDistance = formData.get(`lapDistance${i}`) as string;
        const lapBreakInSeconds = formData.get(`lapBreakInSeconds${i}`) as string;
        const repeats = formData.get(`repeats${i}`) as string;
    
        lapsData.push({
            lapDescription,
            lapSeconds: lapSeconds ? Number(lapSeconds) : null,
            lapDistance: lapDistance ? Number(lapDistance) : null,
            lapBreakInSeconds: lapBreakInSeconds ? Number(lapBreakInSeconds) : null,
            repeats: repeats ? Number(repeats) : 1
        });
    }
    // Create Laps first
    const createdLaps = await Promise.all(
        lapsData.map(lap =>
            prisma.lap.create({
                data: {
                    lapSeconds: lap.lapSeconds,
                    lapDistance: lap.lapDistance,
                    lapBreakInSeconds: lap.lapBreakInSeconds,
                    lapDescription: lap.lapDescription
                }
            })
        )
    );

    // Create the workout with associated workoutLaps
    const workout = await prisma.workout.create({
        data: {
            name,
            type,
            description,
            warmupKm: warmupKm ? Number(warmupKm) : null,
            cooldownKm: cooldownKm ? Number(cooldownKm) : null,
            workoutLaps: {
                create: createdLaps.map((createdLap, index) => ({
                    lapId: createdLap.id,
                    repeats: lapsData[index].repeats
                }))
            }
        },
    });

    return redirect(`/workouts/${workout.id}`);


};

const WorkoutForm: React.FC = () => {

    const [laps, setLaps] = useState([{ id: 1 }]);

    const addLap = () => {
        setLaps([...laps, { id: laps.length + 1 }]);
    };

    // 
    const removeLap = () => {
        setLaps(laps.slice(0, -1));
    };


    return (
        <form method="post">
            <div>
                <label htmlFor="name">Workout Name:</label>
                <input type="text" id="name" name="name" required />
            </div>

            <div>
                <label htmlFor="type">Workout Type:</label>
                <select id="type" name="type" defaultValue="">
                    <option value="" disabled>Select type</option>
                    {Object.values(WorkoutType).map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description"></textarea>
            </div>

            <div>
                <label htmlFor="warmupKm">Warmup Kilometers:</label>
                <input type="number" id="warmupKm" name="warmupKm" />
            </div>

            <div>
                <label htmlFor="cooldownKm">Cooldown Kilometers:</label>
                <input type="number" id="cooldownKm" name="cooldownKm" />
            </div>

            {laps.map((lap, index) => (
                <fieldset key={lap.id}>
                    <legend>Lap {index + 1}</legend>
                    {/* Lap fields with index in the name */}
                    <input type="text" name={`lapDescription${lap.id}`} placeholder="Lap Description" />
                    <input type="number" name={`lapSeconds${lap.id}`} placeholder="Duration (Seconds)" />
                    <input type="number" name={`Repeats${lap.id}`} placeholder="Repeats" />

                    {/* ... other lap fields ... */}
                </fieldset>
            ))}

            <button type="button" onClick={addLap}>Add Another Lap</button>
            <button type="button" onClick={removeLap}>Remove Lap</button>
            <button type="submit">Create Workout</button>

            <button type="submit">Create Workout</button>
        </form>
    );
};

export default WorkoutForm;

