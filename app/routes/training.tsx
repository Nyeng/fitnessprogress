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
    //const data = useLoaderData<typeof loader>();
    const { activity } = useLoaderData<{ activity: Activity }>();
    console.log(activity.id)
    
    return (

        <>
            <div>
                <h2>Last workout</h2>
                <p>Distance covered for your activity: <span> {activity.distance} meter </span></p>
                <p></p>
                <p className="p-2 italic">{activity.description}</p>

            </div>
            <Outlet />
        </>
    );
}