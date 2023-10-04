import { Workout } from "~/domain/workout";

export async function getWorkouts(): Promise<Workout[]> {
    const workouts: Workout[] = [
      {
        id: "1",
        name: "6 * 6 minutes intervals",
        type: "threshold",
        description: "Do 6 * 6 minutes intervals at ~ 90% of max heart rate",
        date: "2022-01-01",
      },
      {
        id: "2",
        name: "Squats",
        type: "strength",
        description: "Do 3 sets of 10 squats",
        date: "2022-01-02",
      },
      //Fill inn more dummy data here pls:
      {
        id: "3",
        name: "5 * 5 minutes intervals",
        type: "threshold",
        description: "Do 5 * 5 minutes intervals at ~ 90% of max heart rate",
        date: "2022-01-03",
      },
      {
        id: "4",
        name: "Deadlifts",
        type: "strength",
        description: "Do 3 sets of 10 deadlifts",
        date: "2022-01-04",
      },
    ];
  
    return workouts;
  }

  //Define a function that returns one workout based on the id

    export async function getWorkout(id: string): Promise<Workout | undefined> {
        const workouts = await getWorkouts();
        const workout = workouts.find((workout) => workout.id === id);
        return workout;
    }