export class Workout {

    constructor(name: string, lap: Lap, warmupKm: number, warmupMiles: number = 0, cooldownKm: number, cooldownMiles: number = 0
    ) {
        this.name = name; this.lap = lap; this.warmupKm = warmupKm; this.warmupMiles = warmupMiles; this.cooldownKm = cooldownKm; this.cooldownMiles = cooldownMiles;
    }

    name: string;
    lap: Lap;
    warmupKm?: GLfloat;
    warmupMiles?: GLfloat;
    cooldownKm?: GLfloat;
    cooldownMiles?: GLfloat;
}

interface Lap {

}

class WorkoutPlan {
    workouts: Workout[] = [];
}

let myWorkoutPlan: WorkoutPlan = {
    workouts: [],
};


