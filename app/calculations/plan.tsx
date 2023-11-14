export enum WorkoutType {
    INTERVAL,
    RACE,
    LONG_RUN
}

export class Lap {
    constructor(
        public lapSeconds: number,
        public lapDistance: number,
        public lapBreakInSeconds: number,
        public lapDescription: string
    ) { }
}


export class LapBuilder {
    private lapSeconds: number = 0;
    private lapDistance: number = 0;
    private lapBreakInSeconds: number = 0;
    private lapDescription: string = ""

    setLapDescription(description: string): LapBuilder {
        this.lapDescription = description;
        return this;
    }

    setLapSeconds(seconds: number): LapBuilder {
        this.lapSeconds = seconds;
        return this;
    }

    setLapDistance(distance: number): LapBuilder {
        this.lapDistance = distance;
        return this;
    }

    setLapBreakInSeconds(seconds: number): LapBuilder {
        this.lapBreakInSeconds = seconds;
        return this;
    }

    build(): Lap {
        return new Lap(this.lapSeconds, this.lapDistance, this.lapBreakInSeconds, this.lapDescription);
    }
}

export class Workout {
    constructor(
        public name: string,
        public type: WorkoutType,
        public description: string,
        public warmupKm: number,
        public cooldownKm: number,
        public laps: Lap[]
    ) { }

    toString(): string {
        let lapsString = '';
        console.log("Length of lapsstring")
        console.log(this.laps.length)
        for (let i = 0; i < this.laps.length; i++) {
            lapsString += `Lap ${i + 1}: Seconds: ${this.laps[i].lapSeconds}, Distance: ${this.laps[i].lapDistance}, Break: ${this.laps[i].lapBreakInSeconds}, Description: ${this.laps[i].lapDescription}\n `;
        }
        return `Workout { name: '${this.name}', type: ${this.type}, description: '${this.description}', warmupKm: ${this.warmupKm}, laps: [\n${lapsString}] }`;
    }
}

export class WorkoutBuilder {

    private type: WorkoutType = WorkoutType.INTERVAL;
    private description: string = '';
    private warmupKm: number = 0;
    private cooldownKm: number = 0;
    private laps: Lap[] = [];

    constructor(private name: string) { }

    setLap(lap: Lap): WorkoutBuilder {
        this.laps.push(lap)
        return this;
    }

    setRepeatedLaps(lap: Lap, repeats: number): WorkoutBuilder {
        for (let i = 0; i < repeats; i++) {
            this.laps.push(lap);
        }
        return this;
    }

    setType(type: WorkoutType): WorkoutBuilder {
        this.type = type;
        return this;
    }

    setCooldown(cooldown: number): WorkoutBuilder {
        this.cooldownKm = cooldown;
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
        return new Workout(this.name, this.type, this.description, this.warmupKm, this.cooldownKm, this.laps);
    }
}
