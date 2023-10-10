import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// add loader here to load env variables
export const loader: LoaderFunction = async () => {

    if (!process.env.CLIENT_ID) {
        throw new Error("Missing CLIENT_ID environment variable");
    }

    return { environent: process.env.ENVIRONMENT, client_id: process.env.CLIENT_ID };
}

export default function Login() {
    const { client_id } = useLoaderData<{ environment: string, client_id: string }>();

    let environment = process.env.ENVIRONMENT;
    if (process.env.VERCEL_ENV) {
        environment = process.env.VERCEL_ENV;
    }

    if (environment === '' || client_id === '') {
        throw new Error("Missing environment parameters for either ENVIRONMENT or CLIENT_ID");
    }

    const base_url = environment === "Production" ? "https://www.fitnessprogress.run/" : "http://localhost:3000";
    console.log(base_url)

    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${base_url}/callback&approval_prompt=auto&scope=read_all,activity:read_all`;

    return (
        <a href={authorizationUrl}>Login with Strava</a>
    );
}
