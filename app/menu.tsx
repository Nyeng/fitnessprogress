import { Link, useLoaderData } from "@remix-run/react";
import strava_image from "./images/btn_strava_connectwith_orange@2x.png";


export default function Menu() {
    const loaderData = useLoaderData<{ client_id: string, vercel_environment: string, vercel_url: string, username: string }>();

    let base_url = loaderData.vercel_environment ? "https://www.fitnessprogress.run/" : "http://localhost:3000";

    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${loaderData.client_id}&response_type=code&redirect_uri=${base_url}/callback&approval_prompt=auto&scope=read_all,activity:read_all`;

    return (
        <div className="flex bg-black">
            <nav className="bg-black">
                <Link to="/" className="ml-auto text-2xl font-bold text-orange-300 border-white">
                    Fitprog
                </Link>
                <Link to="/training/" prefetch="render">
                    Training
                </Link>
                <Link to="/workouts">
                    Workouts
                </Link>
                <LoginButton name={loaderData.username} isLoggedIn={loaderData.username != undefined} />
            </nav>
        </div>
    );


            
    function LoginButton({ name, isLoggedIn }: { name: string, isLoggedIn: boolean }): JSX.Element {
        if (isLoggedIn) {
            return <Link to={"/logout"}>{name} - Logout</Link>
        } else {
            return <Link to={authorizationUrl} >
                <img src={strava_image} className="ml-2 h-12 w-48" alt="Connect with strava" />
            </Link>
        }
    }


}