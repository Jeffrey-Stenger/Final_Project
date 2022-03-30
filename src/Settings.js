import { useState, useEffect, useRef } from "react";

function Settings({ updateRounds, updateDuration }) {
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    useEffect(() => {
        console.log("component rendered", submissionSuccess);
    }, [submissionSuccess]);

    function onSubmit(event) {
        event.preventDefault();
        //--------------------
        setSubmissionSuccess(true);
        setTimeout(() => {
            setSubmissionSuccess(false);
        }, 3000);
        console.log("submissionsuccess", submissionSuccess);

        const chosenActivity = event.target.activity.value;
        console.log("onFormSubmit", chosenActivity);
        //--------------------
        const newRounds = event.target.rounds.value;
        updateRounds(newRounds);

        const newDuration = event.target.duration.value;
        updateDuration(newDuration);

        const totalSessionTime = newRounds * newDuration;
        console.log("total session time: ", totalSessionTime);

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
                <div className="select-activity-container">
                    <h2>What are you currently doing?</h2>

                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="studying"
                            name="activity"
                            value="studying"
                        />
                        <label for="studying">Studying</label>
                    </div>
                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="working"
                            name="activity"
                            value="working"
                        />
                        <label for="working">Working</label>
                    </div>

                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="coding"
                            name="activity"
                            value="coding"
                        />
                        <label for="coding">Coding</label>
                    </div>

                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="reading"
                            name="activity"
                            value="reading"
                        />
                        <label for="reading">Reading</label>
                    </div>
                    <button type="submit">Submit</button>
                    {submissionSuccess && <p>submitted!</p>}
                </div>
            </form>
        </div>
    );
}

export { Settings };
