import React, { useState, useEffect, useRef } from "react";
import "./AnalogClock.css";

const AnalogClock = ({
  isRunning,
  setIsRunning,
  elapsedTime,
  setElapsedTime,
  startTimeref,
  intervalIdRef,
  handleStart,
  handleReset,
}) => {
  useEffect(() => {
    if (!isRunning) return;

    intervalIdRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeref.current);
    }, 10);

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  const formatTime = () => {
    const minutes = Math.floor((elapsedTime / 60000) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((elapsedTime / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const miliseconds = Math.floor((elapsedTime % 1000) / 10)
      .toString()
      .padStart(2, "0");

      return (
        <>
          <span className="minutes">{minutes}</span>
          <span className="colon">:</span>
          <span className="seconds active">{seconds}</span>
          <span className="colon active" >:</span>
          <span className="milliseconds active">{miliseconds}</span>
        </>
      );

  };


  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const secondDegrees = (seconds / 60) * 360;

  return (
    <div className="clock">
      <div className="clock-face">
        {[...Array(12)].map((_, i) => {
          const number = (i) * 5;
          const isFiveSecondMark = i % 5 === 0;
          return (
            <div
              key={i}
              className={`number second-marker ${isFiveSecondMark ? 'five-second' : ''}`}
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <span style={{ transform: `rotate(${-i * 30}deg)` }}>
                {number === 0 ? 60 : number}
              </span>
            </div>
          );
        })}

        <div className="timer">{formatTime()}</div>

        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondDegrees}deg)` }}
        />
        <div className="center-circle" />
      </div>
    </div>
  );
};

export default AnalogClock;
