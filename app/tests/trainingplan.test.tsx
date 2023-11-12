import { expect, test } from 'vitest'
import { Lap, LapBuilder, WorkoutBuilder, WorkoutType } from "../calculations/plan";


test('Test lap time based interval - 6 x 6 minutes', () => {

    // create an instance of Laps[] here and add the ones below
    const soloSprint =
        new LapBuilder().setLapSeconds(15).setLapBreakInSeconds(60).setLapDescription("Just a litle sprint to get things started").build()

    const sixTimesSix = new LapBuilder()
        .setLapDescription("Six times six minutes")
        .setLapBreakInSeconds(60)
        .setLapSeconds(60 * 6)
        .build()

    const workout = new WorkoutBuilder("Six times six minutes")
        .setType(WorkoutType.INTERVAL)
        .setLap(soloSprint)
        .setRepeatedLaps(sixTimesSix, 6)
        .setDescription("The best workout you can do if you handle thresholds")
        .setWarmupKm(3)
        .build();

    console.log(workout.toString()); // Output the workout details
});





