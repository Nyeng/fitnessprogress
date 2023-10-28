
export default async function GetFromStrava(endpoint: string, access_token?: string) {
    if (!access_token) {
        throw new Error("Access token is undefined");
    }

    const activitiesResponse = await fetch(`https://www.strava.com/api/v3/${endpoint}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });

    if (activitiesResponse.ok){
        return activitiesResponse.json()
    }
    throw new Error("Unable to fetch response from Strava")
}