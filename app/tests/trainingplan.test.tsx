import { expect, test } from 'vitest'
import { LapBuilder, Lapstructure, LapstructureBuilder, WorkoutBuilder, WorkoutType } from "../calculations/plan";


test('Create training plan', () => {
    // Create workout
    const workout = new WorkoutBuilder("Sunday long run");

});

test('Six times six + one sprint lap to test flexibility of workout planner ', () => {
    const sixTimesSixLap = new LapBuilder()
        .setDurationSeconds((60 * 6))
        .setBreakInSeconds(60).build();

    // make this into one list in one line instead of the two lines below
    const lapstructureSixTimesSix = new LapstructureBuilder()
        .AddLapXTimes(sixTimesSixLap, 6)
        .AddLap(new LapBuilder().setDurationSeconds(120).build())
        .build()

        console.log(lapstructureSixTimesSix)


    console.log(lapstructureSixTimesSix.durationSeconds)

    const lapStructures: Lapstructure[] = [];
    lapStructures.push(lapstructureSixTimesSix);

    const workout = new WorkoutBuilder("Six times six minutes")
        .setDescription("The best workout you can do if you handle thresholds")
        .setLapStructure(lapStructures)
        .setType(WorkoutType.INTERVAL)
        .setWarmupKm(3)
        .build();


    console.log(workout)
});





