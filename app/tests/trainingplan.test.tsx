import { Type } from "typescript";
import { Workout, WorkoutBuilder, Lapstructure, LapstructureBuilder, Lap, LapBuilder, WorkoutType } from "../calculations/plan";
import { expect, test } from 'vitest'

test('Create training plan', () => {
    // Create workout
    const workout = new WorkoutBuilder("Sunday long run");

    // Set cooldown distance
    workout.setCooldownKm(0.5);

    // Test workout properties
    expect(workout.name).toBe("Sunday long run");
    expect(workout.cooldownMiles).toBe(0.8045);
});

test('Six times six', () => {
    const lap = new LapBuilder()
        .setDurationSeconds((60 * 6))
        .setBreakInSeconds(60);

    // make this into one list in one line instead of the two lines below

    const lapstructureSixTimesSix = new LapstructureBuilder(50).AddLapXTimes(lap, 6).build()
    const lapStructures: Lapstructure[] = [];
    lapStructures.push(lapstructureSixTimesSix);

    const workout = new WorkoutBuilder("Six times six minutes").setLapStructure(lapStructures).setType(WorkoutType.INTERVAL);


});


