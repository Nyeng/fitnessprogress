export default function Login() {
    // Todo: Move to config / parameters
    const authorizationUrl = 'https://www.strava.com/oauth/authorize?client_id=114807&response_type=code&redirect_uri=http://localhost:3000/callback&approval_prompt=auto&scope=read_all,activity:read_all';

    return (
        <a href={authorizationUrl}>Login with Strava</a>
    );
}
