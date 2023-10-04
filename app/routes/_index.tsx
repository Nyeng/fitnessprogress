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
  return (
    <><div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to your workout plan!</h1>
      <p>Here you can find your current training program and also more information about the workouts available.</p>
      <p>Todo: Make this the register user page etc / start site</p>
    </div></>
  );

}


