import { expect, test } from 'vitest'
import { Lap, Lapstructure, LapstructureBuilder, WorkoutBuilder, WorkoutType } from "../calculations/plan";


test('Create training plan', () => {
    // Create workout
    const workout = new WorkoutBuilder("Sunday long run");

});

test('Six times six + one sprint lap to test flexibility of workout planner ', () => {
    // Example usage
    const sixTimesSixLap = new Lap(60 * 6, 60);
    const lapstructureSixTimesSix = new LapstructureBuilder()
        .addLap(sixTimesSixLap, 6)
        .addLap(new Lap(120))
        .addLap(new Lap(60, 20))
        .build();

    console.log(lapstructureSixTimesSix.durationSeconds); // Output the total duration in seconds

    const lapStructures: Lapstructure[] = [lapstructureSixTimesSix];

    const workout = new WorkoutBuilder("Six times six minutes")
        .setLapStructure(lapStructures)
        .setType(WorkoutType.INTERVAL)
        .setDescription("The best workout you can do if you handle thresholds")
        .setWarmupKm(3)
        .build();

    console.log(workout); // Output the workout details
});





