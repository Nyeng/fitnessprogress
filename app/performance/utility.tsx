import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

export function PendingNavigation() {
    const navigation = useNavigation();
    console.log(navigation.state);

    const emojis = ["🏃‍♂️", "🏃‍♀️", "🚶‍♂️"];
    const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentEmojiIndex((prevIndex) =>
                prevIndex === emojis.length - 1 ? 0 : prevIndex + 1
            );
        }, 200);

        return () => clearInterval(intervalId);
    }, [emojis.length]);

    return navigation.state !== "idle" ? (
        <div className="flex fixed top-10 left-20 w-full z-50">
            <div className="animate-pulse text-5xl">
                {emojis[currentEmojiIndex]}{" "}
                <span className="opacity-50" style={{ fontSize: "0.8em" }}>
                    
                </span>
            </div>
        </div>
    ) : null;
}

