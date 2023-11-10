export class Workout {
    constructor(builder: WorkoutBuilder) {
        this.name = builder.name;
        this.lapstructure = builder.lapstructure;
        this.type = builder.type;
        this.warmupKm = builder.warmupKm;
        this.warmupMiles = builder.warmupMiles;
        this.cooldownKm = builder.cooldownKm;
        this.cooldownMiles = builder.cooldownMiles;
        this.description = builder.description;
    }

    name: string;
    lapstructure?: Lapstructure[];
    type?: WorkoutType;
    warmupKm?: GLfloat;
    warmupMiles?: GLfloat;
    cooldownKm?: GLfloat;
    cooldownMiles?: GLfloat;
    description?: string;
}

export class Lapstructure {
    constructor(builder: LapstructureBuilder) {
        this.durationSeconds = builder.durationSeconds ?? 0;
        this.distance = builder.distance ?? 0;
        this.breakInSeconds = builder.breakInSeconds;
        this.breakInDistance = builder.breakInDistance;
    }

    durationSeconds: number;
    distance: number;
    breakInSeconds?: number;
    breakInDistance?: number;
}

export class LapBuilder {
    durationSeconds?: number;
    breakInSeconds?: number;
    distance?: number;
    breakInDistance?: number;

    setBreakInDistance(breakInDistance: number) {
        this.breakInDistance = breakInDistance;
        return this;
    }

    setDistance(distance: number) {
        this.distance = distance;
        return this;
    }

    setDurationSeconds(durationSeconds: number) {
        this.durationSeconds = durationSeconds;
        return this;
    }

    setBreakInSeconds(breakInSeconds: number) {
        this.breakInSeconds = breakInSeconds;
        return this;
    }

    build() {
        return new Lap(this);
    }
}

export class Lap {
    constructor(builder: LapBuilder) {
        this.durationSeconds = builder.durationSeconds;
        this.breakInDistance = builder.breakInDistance;
        this.distance = builder.distance;
        this.breakInDistance = builder.breakInDistance;
    }

    durationSeconds?: number;
    breakInSeconds?: number;
    distance?: number;
    breakInDistance?: number;
}

export class LapstructureBuilder {

    private laps: Lap[] = [];

    AddLaps(laps: Lap[]) {
        laps = this.laps;
        return this;
    }

    AddLap(lap: Lap): LapstructureBuilder {
        this.laps.push(lap);
        return this;
      }

    // AddLapXTimes(lap: Lap, times: number) {
    //     for (let i = 0; i < times; i++) {
    //         this.laps.push(lap);
    //     }
    //     return this;
    // }

    AddLapXTimes(lapBuilder: LapBuilder, times: number): LapstructureBuilder {
        for (let i = 0; i < times; i++) {
          this.laps.push(lapBuilder.build());
        }
        return this;
      }

      build(): Lapstructure {
        return new Lapstructure(this);
      }
}



export enum WorkoutType {
    INTERVAL = 'interval',
    LONG_RUN = 'long run',
    RACE = 'race',
}

export class WorkoutBuilder {
    name: string;
    lapstructure?: Lapstructure[];
    type?: WorkoutType;
    warmupKm?: GLfloat;
    warmupMiles?: GLfloat;
    cooldownKm?: GLfloat;
    cooldownMiles?: GLfloat;
    description?: string;

    constructor(name: string) {
        this.name = name;
    }

    setType(type: WorkoutType) {
        this.type = type;
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setWarmupKm(warmupKm: GLfloat) {
        this.warmupKm = warmupKm;
        return this;
    }

    setWarmupMiles(warmupMiles: GLfloat) {
        this.warmupMiles = warmupMiles;
        return this;
    }

    setCooldownKm(cooldownKm: GLfloat) {
        this.cooldownKm = cooldownKm;
        this.cooldownMiles = this.setCooldownMiles();
        return this;
    }

    setCooldownMiles(): GLfloat {
        if (this.cooldownKm != undefined) {
            return this.cooldownKm * 1.609;
        }
        return 0;
    }

    setLapStructure(lapstructure: Lapstructure[]) {
        this.lapstructure = lapstructure;
        return this;
    }

    build() {
        return new Workout(this);
    }
}


