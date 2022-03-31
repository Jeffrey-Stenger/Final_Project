import { useState, useEffect, useRef } from "react";

function Settings({ updateDuration, updateActivity }) {
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
        updateActivity(chosenActivity);
        console.log("onFormSubmit", chosenActivity);
        //--------------------
        // const newRounds = event.target.rounds.value;
        // updateRounds(newRounds);

        const newDuration = event.target.duration.value;
        updateDuration(newDuration);

        // const totalSessionTime = newRounds * newDuration;
        // console.log("total session time: ", totalSessionTime);

        // console.log("NEW", newRounds, newDuration);
    }

    return (
        <div className="settings-wrapper">
            <h1>SETTINGS</h1>
            <form className="settings-form" onSubmit={onSubmit}>
                <div>
                    <label for="duration">
                        Length of Work Session(in minutes):{" "}
                    </label>
                    <input
                        type="number"
                        id="duration"
                        min="1"
                        max="120"
                    ></input>
                </div>
                {/* <div>
                    <label for="rounds">Number of rounds: </label>
                    <input
                        type="number"
                        id="rounds"
                        name="rounds"
                        min="1"
                    ></input>
                </div>  */}
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
                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="exercising"
                            name="activity"
                            value="exercising"
                        />
                        <label for="exercising">Exercising</label>
                    </div>
                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="team-meeting"
                            name="activity"
                            value="team meeting"
                        />
                        <label for="team-meeting">Team Meeting</label>
                    </div>
                    <div className="radio-option-wrapper">
                        <input
                            type="radio"
                            id="responding-to-emails"
                            name="activity"
                            value="responding to emails"
                        />
                        <label for="team-meeting">Responding to emails</label>
                    </div>
                    <button type="submit">Submit</button>
                    {submissionSuccess && <p>submitted!</p>}
                </div>
            </form>
        </div>
    );
}

export { Settings };
