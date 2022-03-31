import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import { Timer } from "./Timer";
import { Settings } from "./Settings";
import Stats from "./Stats";
import Instructions from "./Instructions";
import Modal from "./Modal";
// import SelectActivity from "./SelectActivity";

const logo = "doctor_logo.png";

function App() {
    const [rounds, setRounds] = useState(5);
    const [roundDuration, setRoundDuration] = useState(0.1);
    const [showModal, setShowModal] = useState(false);

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

    function displayModal() {
        console.log("Parent modal reached");
        setShowModal(true);
    }

    function hideModal(newDuration) {
        console.log("Parent hide modal reached");
        setRoundDuration(5);
        setShowModal(false);
    }

    return (
        <BrowserRouter>
            <header className="nav-bar">
                <div className="left">
                    <NavLink to="/">
                        <img src={logo} className="logo" alt="" />
                    </NavLink>
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
            <Route exact path="/">
                <section className="main-page">
                    {showModal && <Modal hideModal={hideModal} />}
                    <Settings
                        updateRounds={parentRoundUpdater}
                        updateDuration={parentUpdateDuration}
                    />
                    <Timer
                        rounds={rounds}
                        roundDuration={roundDuration}
                        displayModal={() => {
                            console.log("toggle modal in timer triggered");
                            displayModal();
                        }}
                    />

                    {/* <SelectActivity /> */}
                </section>
            </Route>
            <Switch>
                <Route path="/Instructions">
                    <Instructions />
                </Route>
                <Route path="/Stats">
                    <Stats />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
