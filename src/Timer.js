import { useState, useEffect, useRef } from "react";

function Timer({ rounds, roundDuration, displayModal }) {
    const [time, setTime] = useState(roundDuration);
    // const [timeOverEvent, setTimeOverEvent] = useState(false);
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
        useEffect(() => {
            if (time === 0) {
                stopIncrement();
                displayModal();
            }
        }, []);
    }

    useEffect(() => {
        if (time === 0) {
            stopIncrement();
            displayModal();
        }
    }, []);

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

export { Timer };
