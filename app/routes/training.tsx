import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getSession } from "~/authhandling/sessions";
import GetFromStrava from "~/data/strava_api";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    
    if (session.data.access_token != undefined) {
        const activitiesResponse = await GetFromStrava("activities/10123221063", session.data.access_token)
        return json({ activity: activitiesResponse });
    }
    return {}
};


export default function Training() {
    const { activity } = useLoaderData<{ activity: Activity }>();

    const activityType: Record<string, string> = {
        "strength": "💪",
        "Run": "🏃‍♂️",
    };

    if (!activity) {
        return (
            <>
                <div>
                    <h2>You must log in with Strava to see your activity</h2>
                    <p>Click the login button</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <h2>{activity.name} {activityType[activity.type]}</h2>
                <p> <span> {activity.distance} meter  </span></p>
                <p><span>{activity.average_heartrate} ❤️</span></p>
                <p className="p-2 italic">{activity.description}</p>
            </div>
        </>
    );
}