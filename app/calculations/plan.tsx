export enum WorkoutType {
    INTERVAL,
    // ... other types as needed
}

class Lap {
    durationSeconds: number;
    breakInSeconds: number;

    constructor(durationSeconds: number, breakInSeconds: number = 0) {
        this.durationSeconds = durationSeconds;
        this.breakInSeconds = breakInSeconds;
    }
}

export class LapBuilder {
    private durationSeconds: number = 0;
    private breakInSeconds: number = 0;

    setDurationSeconds(seconds: number): LapBuilder {
        this.durationSeconds = seconds;
        return this;
    }

    setBreakInSeconds(seconds: number): LapBuilder {
        this.breakInSeconds = seconds;
        return this;
    }

    build(): Lap {
        return new Lap(this.durationSeconds, this.breakInSeconds);
    }
}

export class Lapstructure {
    laps: Lap[] = [];
    durationSeconds: number = 0;

    constructor(laps: Lap[]) {
        this.laps = laps;
        this.durationSeconds = laps.reduce((total, lap) => total + lap.durationSeconds, 0);
    }
}

export class LapstructureBuilder {
    private laps: Lap[] = [];

    AddLapXTimes(lap: Lap, times: number): LapstructureBuilder {
        for (let i = 0; i < times; i++) {
            this.laps.push(lap);
        }
        return this;
    }

    AddLap(lap: Lap): LapstructureBuilder {
        this.laps.push(lap);
        return this;
    }

    build(): Lapstructure {
        return new Lapstructure(this.laps);
    }
}

export class Workout {
    name: string;
    lapStructure: Lapstructure[];
    type: WorkoutType;
    description: string;
    warmupKm: number;

    constructor(name: string, lapStructure: Lapstructure[], type: WorkoutType, description: string, warmupKm: number = 0) {
        this.name = name;
        this.lapStructure = lapStructure;
        this.type = type;
        this.description = description;
        this.warmupKm = warmupKm;
    }
}

export class WorkoutBuilder {
    private name: string;
    private lapStructure: Lapstructure[] = [];
    private type: WorkoutType = WorkoutType.INTERVAL;
    private description: string = '';
    private warmupKm: number = 0;

    constructor(name: string) {
        this.name = name;
    }

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
