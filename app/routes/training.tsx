import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getSession } from "~/authhandling/sessions";
import GetFromStrava from "~/data/strava_api";

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const activitiesResponse = await GetFromStrava("activities/10055422088", session.data.access_token)
    return activitiesResponse;
};

export default function Training() {
    const { activities } = useLoaderData<{ activities: JSON }>();
    console.log(JSON.stringify(activities))
    return (
        <>
            {/* Add shadow and margin to this div */}
            <div>
                <h1>Here comes your training man</h1>
                <p>Let's see how this layout works out</p>
                <p>{JSON.stringify(activities)}</p>
            </div>
            <Outlet />
        </>
    );
}
