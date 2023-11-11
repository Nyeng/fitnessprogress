export enum WorkoutType {
    INTERVAL,
    RACE,
    LONG_RUN
}

export class Lap {
    constructor(public durationSeconds: number, public breakInSeconds: number = 0) { }
}

export class Lapstructure {
    durationSeconds: number = 0;

    constructor(public laps: Lap[]) {
        this.durationSeconds = laps.reduce((total, lap) => total + lap.durationSeconds, 0);
    }
}

export class LapstructureBuilder {
    private laps: Lap[] = [];

    addLap(lap: Lap, times: number = 1): LapstructureBuilder {
        this.laps.push(...Array(times).fill(lap));
        return this;
    }

    build(): Lapstructure {
        return new Lapstructure(this.laps);
    }
}

export class Workout {
    constructor(public name: string, public lapStructure: Lapstructure[], public type: WorkoutType = WorkoutType.INTERVAL, public description: string = '', public warmupKm: number = 0) { }
}

export class WorkoutBuilder {
    private lapStructure: Lapstructure[] = [];
    private type: WorkoutType = WorkoutType.INTERVAL;
    private description: string = '';
    private warmupKm: number = 0;

    constructor(private name: string) { }

    setLapStructure(lapStructure: Lapstructure[]): WorkoutBuilder {
        this.lapStructure = lapStructure;
        return this;
    }

    setType(type: WorkoutType): WorkoutBuilder {
        this.type = type;
        return this;
    }

    setDescription(description: string): WorkoutBuilder {
        this.description = description;
        return this;
    }

    setWarmupKm(km: number): WorkoutBuilder {
        this.warmupKm = km;
        return this;
    }

    build(): Workout {
        return new Workout(this.name, this.lapStructure, this.type, this.description, this.warmupKm);
    }
}
