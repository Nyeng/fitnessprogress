import { LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { getSession } from "~/sessions";


export default function LastWorkout() {
    

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(prevState => !prevState); // Toggle isExpanded between true and false
    };


    return (

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <section id="last-session" className="content-section">
                <h1>Last Training Session</h1>
                <div id="strava-data">
                    <img src="https://media.istockphoto.com/id/690027826/vector/background-of-a-color-strip.jpg?s=1024x1024&w=is&k=20&c=pb6PnVXdvDDJ5gigI8paCYXsNyJBGzJn3SUOrWDizmk=" alt="Workout" className="float-right clear w-20 md:w-32 lg:w-35" />
                    <p>🏃‍♂️ 7km in 32min 💨</p>
                    <p>🗓 October 4th, 2023 📍 Tøyen Park Run</p>
                    <p>📝 This was a great run! I felt really good and managed to keep a good pace throughout the entire run. I was a bit tired afterwards, but it was a good tired. I'm looking forward to the next run!</p>
                </div>
                <button id="expand-data" className="bg-black text-white" onClick={handleExpandClick}>Heart rate data</button>
                {isExpanded && (
                    <table>
                        <thead>
                            <tr>
                                <th>Average heart rate</th>
                                <th>Max heart rate</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>150 bpm</td>
                                <td>180 bpm</td>
                                <td>75%</td>
                            </tr>
                        </tbody>
                    </table>
                )}

            </section>
        </div>
    );
}