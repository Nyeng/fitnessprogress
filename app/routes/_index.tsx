import { MetaFunction, json } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { Workout } from "~/domain/workout";
import { getWorkouts } from "~/data/workouts";

export const meta: MetaFunction = () => {
  return [
    { title: "Fitness progress" },
    { name: "description", content: "My current training program!" },
  ];
};

export const loader = async () => {
  const workouts = await getWorkouts();
  var data = json({ workouts });
  return data
};


export default function Index() {
  const { workouts } = useLoaderData<{ workouts: Workout[] }>();
  return (
    <><div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to your workout plan!</h1>
      <p>Here you can find your current training program and also more information about the workouts available.</p>
    </div><div id="workouts">
        <h2>Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
              <p style={{ color: "green" }}>{workout.description}</p>
            </li>
          ))}
        </ul>
      </div></>
  );

}


