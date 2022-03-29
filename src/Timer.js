import { useState, useEffect, useRef } from "react";

function Timer({ rounds, roundDuration }) {
    const [time, setTime] = useState(roundDuration);
    const counter = useRef(0);
    const workSeconds = useRef(0);

    useEffect(() => {
        setTime(roundDuration);
    }, [roundDuration]);

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

function Settings({ updateRounds, updateDuration }) {
    function onSubmit(event) {
        event.preventDefault();
        const newRounds = event.target.rounds.value;
        updateRounds(newRounds);

        const newDuration = event.target.duration.value;
        updateDuration(newDuration);

        console.log("NEW", newRounds, newDuration);
    }

    return (
        <div className="settings-wrapper">
            <h1>SETTINGS</h1>
            <form className="settings-form" onSubmit={onSubmit}>
                <div>
                    <label for="duration">Length of Round(in minutes): </label>
                    <input type="number" id="duration" min="1" max="59"></input>
                </div>
                <div>
                    <label for="rounds">Number of rounds: </label>
                    <input
                        type="number"
                        id="rounds"
                        name="rounds"
                        min="1"
                    ></input>
                    {/* <button onClick={updateRounds}>Update Rounds</button> */}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export { Timer, Settings };
