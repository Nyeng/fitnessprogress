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

/**
 * Renders the index page of the workout plan app.
 * 
 * By signing in via Strava, users can create workout plans and keep track of their training progress from Strava. 
 * The app allows users to compare their current workouts to their plan and rewards them when they follow the plan.
 * 
 * @returns The rendered index page.
 */
export default function Index() {
  return (
    <><div>
      <h1>Welcome to your workout plan!</h1>
      <p>Here you can find your current training program and also more information about the workouts available.</p>

      <p>By signing in via <a href="https://www.strava.com/">Strava</a>, you can create workout plans and keep track of your training progress from Strava. The app allows you to compare your current workouts to your plan and rewards you when you follow the plan.</p>

      <p>When signing up you agree to have your minimal user data securely stored in our database. The data will not be shared to any third parties and will only be used </p>

    </div></>
  );
}


