import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// add loader here to load env variables
export const loader: LoaderFunction = async () => {

    if (!process.env.CLIENT_ID) {
        throw new Error("Missing CLIENT_ID environment variable");
    }

    return { client_id: process.env.CLIENT_ID, vercel_environment: process.env.VERCEL_ENV, vercel_url: process.env.VERCEL_URL };
}

export default function Login() {
    const { client_id, vercel_environment, vercel_url } = useLoaderData<{ client_id: string, vercel_environment: string, vercel_url: string }>();

    let base_url = "http://localhost:3000";

    if (vercel_environment) {
        base_url = 'https://' + vercel_url;
        console.log("Baseurl", base_url)
    }

    console.log("Baseurl", base_url)

    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${base_url}/callback&approval_prompt=auto&scope=read_all,activity:read_all`;

    return (
        <a href={authorizationUrl}>Login with Strava</a>
    );
}
