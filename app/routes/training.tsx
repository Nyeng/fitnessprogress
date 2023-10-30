import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getSession } from "~/authhandling/sessions";
import GetFromStrava from "~/data/strava_api";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const activitiesResponse = await GetFromStrava("activities/10123221063", session.data.access_token)
    return json({ activity: activitiesResponse });

};


export default function Training() {
    const { activity } = useLoaderData<{ activity: Activity }>();
    console.log(activity.id)

    const activityType: Record<string, string> = {
        "strength": "💪",
        "Run": "🏃‍♂️",
    };

    return (
        <>
            <div>
                <h2>{activity.name} {activityType[activity.type]}</h2>
                <p> <span> {activity.distance} meter  </span></p>
                <p><span>{activity.average_heartrate} ❤️</span></p>
                <p className="p-2 italic">{activity.description}</p>
            </div>
            <Outlet />
        </>
    );
}