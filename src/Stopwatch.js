import React, {useState, useEffect, useRef} from "react";

export default function Stopwatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeref = useRef(0);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if(!isRunning) return;

        intervalIdRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTimeref.current);
        }, 10);

        return () => clearInterval(intervalIdRef.current);
    },[isRunning])

    const handleStart = () => {
        setIsRunning((prev) => !prev);
        startTimeref.current = Date.now() - elapsedTime;
    }

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
    }

    const formatTime = () => {
        const minutes = Math.floor((elapsedTime / 60000) % 60).toString().padStart(2, '0');
        const seconds  = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
        const miliseconds = Math.floor((elapsedTime % 1000) /10).toString().padStart(2, '0');

        return `${minutes}:${seconds}:${miliseconds}`;
    }
    return (
        <div className="stopwatch">
            <div className="time">{formatTime()}</div>
            <div className="buttons">
                <button className="start" onClick={() => {handleStart()}}>{isRunning ? "Pause" : "Start"}</button>
                <button className="reset" onClick={() => {handleReset()}}>Reset</button>
            </div>
        </div>
    )
}
