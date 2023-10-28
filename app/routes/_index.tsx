import { MetaFunction, json } from "@remix-run/node";
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
  return (
    <><div>
      <h1>Welcome to your workout plan!</h1>
      <p>Here you can find your current training program and also more information about the workouts available.</p>
    </div></>
  );

}


