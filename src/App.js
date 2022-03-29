import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";

import { Timer, Settings } from "./Timer";
import Stats from "./Stats";

const logo = "doctor_logo.png";

function App() {
    const [rounds, setRounds] = useState(5);
    const [roundDuration, setRoundDuration] = useState(25);

    useEffect(() => {
        fetch("/api/me")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);

    function parentRoundUpdater(numberOfRounds) {
        console.log("PARENT ROUNDS", numberOfRounds);
        setRounds(numberOfRounds);
    }

    function parentUpdateDuration(newDuration) {
        console.log("parent duration", newDuration);
        setRoundDuration(newDuration);
    }

    return (
        <BrowserRouter>
            <header className="nav-bar">
                <img src={logo} className="logo" />
                <h1>Dr Deep Work</h1>
                <div className="link-wrapper">
                    <NavLink className="nav-link" to="/Stats">
                        My Statistics
                    </NavLink>
                </div>
            </header>
            <section className="main-page">
                <Timer rounds={rounds} roundDuration={roundDuration} />
                <Settings
                    updateRounds={parentRoundUpdater}
                    updateDuration={parentUpdateDuration}
                />
            </section>
        </BrowserRouter>
    );
}

export default App;
