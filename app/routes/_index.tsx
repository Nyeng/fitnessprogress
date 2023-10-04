import { MetaFunction, json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness progress" },
    { name: "description", content: "My current training program!" },
  ];
};


type Workout = {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
};

async function getWorkouts(): Promise<Workout[]> {
  const workouts: Workout[] = [
    {
      id: 1,
      name: "6 * 6 minutes intervals",
      type: "threshold",
      description: "Do 6 * 6 minutes intervals at ~ 90% of max heart rate",
      date: "2022-01-01",
    },
    {
      id: 2,
      name: "Squats",
      type: "strength",
      description: "Do 3 sets of 10 squats",
      date: "2022-01-02",
    },
    //Fill inn more dummy data here pls:
    {
      id: 3,
      name: "5 * 5 minutes intervals",
      type: "threshold",
      description: "Do 5 * 5 minutes intervals at ~ 90% of max heart rate",
      date: "2022-01-03",
    },
    {
      id: 4,
      name: "Deadlifts",
      type: "strength",
      description: "Do 3 sets of 10 deadlifts",
      date: "2022-01-04",
    },
    

  ];

  return workouts;
}

export const loader = async () => {
  const workouts = await getWorkouts();
  var data = json({ workouts });
  return data
};


export default function Index() {
  const { workouts } = useLoaderData<{ workouts: Workout[] }>();
  return (
    <><div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div><div id="workouts">
        <h2>Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <a href={`/workouts/${workout.id}`}>{workout.name}</a>
              <p style={{ color: "green" }}>{workout.description}</p>
            </li>
          ))}
        </ul>
      </div></>
  );

}


