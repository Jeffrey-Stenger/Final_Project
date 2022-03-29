import { useState, useEffect, useRef } from "react";

function Timer({ rounds, roundDuration }) {
    const [time, setTime] = useState(5);
    const counter = useRef(null);
    const workSeconds = useRef(0);

    // const [minutes, setMinutes] = useState();
    // const [seconds, setseconds] = useState();

    // const seconds = minutes % 60;

    function stopIncrement() {
        window.clearInterval(counter.current);
    }

    useEffect(() => {
        workSeconds.current = workSeconds.current + 1;
        const totalWorkedSeconds = workSeconds.current;
        return totalWorkedSeconds;
    });

    if (time === 0) {
        stopIncrement();
    }

    function startCountdown() {
        console.log("Time", time);
        if (time > 0) {
            counter.current = window.setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
            return;
        }
    }

    function pauseCountdown() {
        stopIncrement();
    }

    return (
        <section className="timer-wrapper">
            <div className="timer-container">
                <div className="time-window">
                    Time Remaining:
                    <div className="minutes">{time}</div>
                </div>
                <div>{workSeconds.current} seconds worked</div>
            </div>
            <div className="timer-button-wrapper">
                <button onClick={startCountdown}>Start</button>
                <button onClick={pauseCountdown}>Pause</button>
                <button>Stop</button>
            </div>
        </section>
    );
}

function Settings() {
    function onSubmit() {
        console.log("clicked");
    }

    return (
        <div className="settings-wrapper">
            <h1>SETTINGS</h1>
            <form className="settings-form" onSubmit={onSubmit}>
                <div>
                    <label for="duration">Length of Round(in minutes): </label>
                    <input type="number" id="duration"></input>
                </div>
                <div>
                    <label for="rounds">Number of rounds: </label>
                    <input type="number" id="rounds"></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export { Timer, Settings };
