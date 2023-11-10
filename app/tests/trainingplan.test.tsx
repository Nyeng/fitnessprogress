import { Workout } from "../calculations/plan";
import { expect, test } from 'vitest'

test('Create training plan', () => {
    let workout = new Workout('Evening Walk', {}, 1, 1, 0.5);
    expect(workout.name).toBe("Evening Walk")
    expect(workout.cooldownKm).toBe(0.5)
});
