import { useState, useEffect, useRef } from "react";

export default function SelectActivity() {
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    useEffect(() => {
        console.log("component rendered", submissionSuccess);
    }, [submissionSuccess]);

    function activitySubmit(event) {
        event.preventDefault();
        setSubmissionSuccess(true);
        setTimeout(() => {
            setSubmissionSuccess(false);
        }, 3000);
        console.log("submissionsuccess", submissionSuccess);

        const chosenActivity = event.target.activity.value;
        console.log("onFormSubmit", chosenActivity);

        // fetch("/api/users/activity", {
        //     method: "POST",
        //     body: JSON.stringify({ activity: chosenActivity }),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log("SUCCESS POST");
        //         return data;
        //     });
    }

    return (
        <section className="select-activity-container">
            <h2>What are you currently doing?</h2>
            <form className="select-form" onSubmit={activitySubmit}>
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
            </form>
        </section>
    );
}
