import { WorkoutType } from "@prisma/client";
import { ActionFunction, redirect } from "@remix-run/node";
import prisma from "prisma/client";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as WorkoutType;
    const description = formData.get("description") as string;
    const warmupKm = formData.get("warmupKm") as string;
    const cooldownKm = formData.get("cooldownKm") as string;

    // Validate the data here...

    // Create a new workout in the database
    const workout = await prisma.workout.create({
        data: {
            name,
            type,
            description,
            warmupKm: warmupKm ? Number(warmupKm) : null,
            cooldownKm: cooldownKm ? Number(cooldownKm) : null,
            // Add laps data here
        },
    });

    return redirect(`/workouts/${workout.id}`);
};

const WorkoutForm: React.FC = () => {
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

            {/* Dynamic Laps Inputs - Example with one lap for simplicity */}
            <fieldset>
                <legend>Lap Details</legend>
                <div>
                    <label htmlFor="lapDescription">Lap Description:</label>
                    <input type="text" id="lapDescription" name="lapDescription" />
                </div>
                <div>
                    <label htmlFor="lapSeconds">Lap Duration (Seconds):</label>
                    <input type="number" id="lapSeconds" name="lapSeconds" />
                </div>
                <div>
                    <label htmlFor="lapDistance">Lap Distance:</label>
                    <input type="number" id="lapDistance" name="lapDistance" />
                </div>
                <div>
                    <label htmlFor="lapBreakInSeconds">Break Time (Seconds):</label>
                    <input type="number" id="lapBreakInSeconds" name="lapBreakInSeconds" />
                </div>
                <div>
                    <label htmlFor="repeats">Number of Repeats:</label>
                    <input type="number" id="repeats" name="repeats" />
                </div>
            </fieldset>

            <button type="submit">Create Workout</button>
        </form>
    );
};


export default WorkoutForm;


