import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { json } from "@vercel/remix";
import { getWorkouts } from "./data/workouts";
import { Workout } from "./domain/workout";


export const loader = async () => {
  const workouts = await getWorkouts();
  var data = json({ workouts });
  return data
};



export default function App() {
  const { workouts } = useLoaderData<{ workouts: Workout[] }>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <div id="workouts">
        <h2>Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
            </li>
          ))}
        </ul>
      </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
