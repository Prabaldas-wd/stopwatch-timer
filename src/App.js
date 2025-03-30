import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AnalogClock from "./AnalogClock";
import play from "./assets/play.png";
import pause from "./assets/pause.png";
import reset from "./assets/reset.png";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeref = useRef(0);
  const intervalIdRef = useRef(null);

  const handleStart = () => {
    setIsRunning((prev) => !prev);
    startTimeref.current = Date.now() - elapsedTime;
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };
  return (
    <div className="App">
      <div className="timer-parent">
        <AnalogClock
          isRunning={isRunning}
          elapsedTime={elapsedTime}
          setElapsedTime={setElapsedTime}
          startTimeref={startTimeref}
          intervalIdRef={intervalIdRef}
        />

        <div className="buttons__parent">
          <div
            className="start"
            onClick={() => {
              handleStart();
            }}
          >
            {isRunning ? (
              <img src={pause} className="playIcon" />
            ) : (
              <img src={play} className="playIcon" />
            )}
          </div>
          {(isRunning || elapsedTime !== 0) && (
            <div
              className="reset"
              onClick={() => {
                handleReset();
              }}
            >
              <img src={reset} className="resetIcon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
