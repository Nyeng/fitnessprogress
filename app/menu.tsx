import { Link, useLoaderData } from "@remix-run/react";
import strava_image from "./images/btn_strava_connectwith_orange@2x.png";


export default function Menu({ }: {}) {
    const loaderData = useLoaderData<{ client_id: string, vercel_environment: string, vercel_url: string, user_id: string }>();

    let base_url = loaderData.vercel_environment ? "https://www.fitnessprogress.run/" : "http://localhost:3000";

    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${loaderData.client_id}&response_type=code&redirect_uri=${base_url}/callback&approval_prompt=auto&scope=read_all,activity:read_all`;

    return (
        <nav className="bg-gradient-to-r from-pink-200 to-yellow-400 flex items-center">
            <Link to="/" className="hover:text-white hover:text-gray-200 mr-4">
                <span className="text-2xl font-bold">Fitprog</span>
            </Link>
            <Link to="/workouts" className="hover:text-white hover:bg-yellow-600 mr-4">
                Workouts
            </Link>
            <LoginButton name={loaderData.user_id} isLoggedIn={loaderData.user_id != undefined} />
        </nav>
    );

    function LoginButton({ name, isLoggedIn }: { name: string, isLoggedIn: boolean }): JSX.Element {
        if (isLoggedIn) {
            return <Link to={"/logout"}>{name} - Logout</Link>
        } else {
            return <Link to={authorizationUrl} className="hover:text-white hover:bg-white-600 mr-4">
                <img src={strava_image} className="ml-2 h-12 w-48" alt="Connect with strava" />
            </Link>
        }
    }


}