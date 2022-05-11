import React, { useState, useEffect } from "react";

function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [pause, setPause] = useState(false);
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (start === true) {
        if (seconds === 0) {
          if (minutes !== 0) {
            // seconds are 0 but minutes are not 0
            // -> decrease minutes by 1 and reset seconds from 0 to 59
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            // both minutes and seconds are 0
            // -> we start a new break timer, or reset the timer if the break finished

            let minutes = displayMessage ? 24 : 4;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
          }
        } else {
          // seconds are not 0
          // -> just decrease seconds by 1
          setSeconds((seconds) => seconds - 1);
        }
        return () => {
          // this runs as the clean up function for the useEffect
          clearInterval(interval);
        };
      }
    }, 1000);
  }, [seconds,start,pause]);

  return (
    <div>
      {" "}
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
      <button type="button" onClick={()=>setStart(!start)} className="btn">
        {start === true ? "Stop" : "Start"}
      </button>     
      <button type="button"  className="btn">
        Reset
      </button>
    </div>
  );
}

export default Pomodoro;
