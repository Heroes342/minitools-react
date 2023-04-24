import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";

export const CronometerLogic = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setRunning(true)} disabled={running}>
          <FontAwesomeIcon icon={faPlay} size="sm" />
        </button>
        <button onClick={() => setRunning(false)} disabled={!running}>
          <FontAwesomeIcon icon={faPause} size="sm" />
        </button>
        <button
          onClick={() => {
            setTime(0);
            setRunning(false);
          }}
          disabled={time > 0 ? false : true}
        >
          <FontAwesomeIcon icon={faStop} size="sm" />
        </button>
      </div>
    </div>
  );
};

export default CronometerLogic;
