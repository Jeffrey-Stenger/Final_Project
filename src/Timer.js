import { useState, useEffect, useRef } from "react";

function Timer({ rounds, roundDuration }) {
    const [time, setTime] = useState(roundDuration);
    const counter = useRef();
    // const workSeconds = useRef(0);

    const workCount = 0;

    useEffect(() => {
        setTime(roundDuration * 60);
    }, [roundDuration]);

    function formatTime(time) {
        return (time - (time %= 60)) / 60 + (9 < time ? ":" : ":0") + time;
    }

    const displayTime = formatTime(time);

    function stopIncrement() {
        window.clearInterval(counter.current);
    }

    // useEffect(() => {
    //     workSeconds.current = workSeconds.current + 1;
    //     const totalWorkedSeconds = workSeconds.current;
    //     return totalWorkedSeconds;
    // });

    if (time === 0) {
        stopIncrement();
    }

    function startCountdown(workCount) {
        console.log("Time", time);
        if (time > 0) {
            counter.current = window.setInterval(() => {
                setTime((time) => time - 1);
                workCount++;
                console.log("counter.current:", { counter });
            }, 1000);
        }
    }

    function pauseCountdown() {
        stopIncrement();
    }

    function stopSession() {
        setTime(0);
    }

    return (
        <section className="timer-wrapper">
            <div className="timer-container">
                <div className="time-window">
                    Time Remaining:
                    <div className="minutes">{displayTime}</div>
                </div>
            </div>
            <div className="timer-button-wrapper">
                <button onClick={startCountdown}>Start</button>
                <button onClick={pauseCountdown}>Pause</button>
                <button onClick={stopSession}>Cancel All</button>
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
