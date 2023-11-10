import { Type } from "typescript";
import { Workout, WorkoutBuilder, Lapstructure, LapstructureBuilder, Lap, LapBuilder, WorkoutType } from "../calculations/plan";
import { expect, test } from 'vitest'

test('Create training plan', () => {
    // Create workout
    const workout = new WorkoutBuilder("Sunday long run");

    // Set cooldown distance
    workout.setCooldownKm(0.5);

    // Test workout properties
    console.log(workout.name);
    console.log(workout.cooldownMiles);
    expect(workout.name).toBe("Sunday long run");
    expect(workout.cooldownMiles).toBe(0.8045);
});

test('Six times six + one sprint lap to test flexibility of workout planner ', () => {
    const sixTimesSixLap = new LapBuilder()
        .setDurationSeconds((60 * 6))
        .setBreakInSeconds(60);

    // make this into one list in one line instead of the two lines below
    const lapstructureSixTimesSix = new LapstructureBuilder()
        .AddLapXTimes(sixTimesSixLap, 6)
        .AddLap(new LapBuilder().setDurationSeconds(120).build())
        .build()

    console.log(lapstructureSixTimesSix.durationSeconds)

    const lapStructures: Lapstructure[] = [];
    lapStructures.push(lapstructureSixTimesSix);

    const workout = new WorkoutBuilder("Six times six minutes")
        .setLapStructure(lapStructures)
        .setType(WorkoutType.INTERVAL)
        .setDescription("The best workout you can do if you handle thresholds")
        .setWarmupKm(3)
        .build();

    // Test workout properties
    // console.log(workout.name);
    // console.log(workout.type);
    // console.log(workout.description);
    // console.log(workout.warmupKm);

    console.log(workout)
    console.log(workout.lapstructure?.[0].durationSeconds)
});





