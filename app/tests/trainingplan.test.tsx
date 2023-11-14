import { expect, test } from 'vitest'
import { Lap, LapBuilder, WorkoutBuilder, WorkoutType } from "../calculations/plan";


test('Test lap time based interval - 6 x 6 minutes', () => {

    const soloSprint =
        new LapBuilder().setLapSeconds(15).setLapBreakInSeconds(60).setLapDescription("Just a litle sprint to get things started").build()

    const sixTimesSix = new LapBuilder()
        .setLapDescription("Six times six minutes")
        .setLapBreakInSeconds(60)
        .setLapSeconds(60 * 6)
        .build()

    const workout = new WorkoutBuilder("Six times six minutes")
        .setType(WorkoutType.INTERVAL)
        .setRepeatedLaps(sixTimesSix, 6)
        .setLap(soloSprint)
        .setDescription("The best workout you can do if you handle thresholds")
        .setWarmupKm(3)
        .build();

    console.log(workout.toString()); // Output the workout details
});





