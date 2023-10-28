import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";



export const loader: LoaderFunction = async ({ }) => {

    var value = Math.floor(Math.random() * 99) + 1;
    var data = json({ value });
    // todo: return activities here instead of data
    return data
};

export default function Plan() {

    const [progress, setProgress] = useState(Math.floor(Math.random() * 99) + 1); // set initial progress to the value generated in the loader function

    useEffect(() => {
        setProgress(Math.floor(Math.random() * 99) + 1);
    }, [Math.floor(Math.random() * 99) + 1]);

    return (
        <div>
            <h1>Training plan</h1>
            <p>This is your status on the current training plan</p>

            <svg viewBox="0 0 100 100" className="w-24 h-24">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1c40f" strokeWidth="10" strokeDasharray={`${progress}, 100`} strokeLinecap="round" />
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold">
                    {progress >= 90 ? "🔥" : progress >= 70 ? "💪" : progress >= 50 ? "👍" : progress >= 30 ? "🤔" : "😴"}
                </text>
            </svg>
        </div>
    );
}
