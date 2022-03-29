import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import { Timer, Settings } from "./Timer";
import Stats from "./Stats";
import UpdateActivity from "./Activity";
import Instructions from "./Instructions";
import SelectActivity from "./SelectActivity";

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
            <Switch>
                <Route exact path="/">
                    <header className="nav-bar">
                        <div className="left">
                            <img src={logo} className="logo" />
                        </div>
                        <h1>Dr Deep Work</h1>
                        <div className="link-wrapper right">
                            <NavLink className="nav-link" to="/Stats">
                                My Statistics
                            </NavLink>
                            <NavLink className="nav-link" to="/Instructions">
                                Instructions
                            </NavLink>
                        </div>
                    </header>
                    <section className="main-page">
                        <Timer rounds={rounds} roundDuration={roundDuration} />
                        <Settings
                            updateRounds={parentRoundUpdater}
                            updateDuration={parentUpdateDuration}
                        />
                        <SelectActivity />
                    </section>
                </Route>
                <Route path="/Instructions">
                    <Instructions />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
