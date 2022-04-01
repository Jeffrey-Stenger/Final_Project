import { useState, useEffect, useRef } from "react";

export default function Modal({ hideModal, roundDuration, activity }) {
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    function closeModal() {
        hideModal();
    }

    function submitWork() {
        setSubmissionSuccess(true);
        setTimeout(() => {
            hideModal();
        }, 3000);
        fetch("/api/me/worksession", {
            method: "POST",
            body: JSON.stringify({
                work_time: roundDuration,
                activity: activity,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("SUCCESS POST");
                return data;
            });
    }

    // function doNotSave() {
    //     hideModal();
    // }

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    {/* <button onClick={closeModal} className="modal-close-button">
                        &times;
                    </button> */}
                    <h2>
                        Good job. You've completed your intended work session!
                    </h2>
                    <button onClick={submitWork}>
                        Save it to your journal here
                    </button>
                    <button onClick={closeModal}>No Thanks</button>
                    {submissionSuccess && <p>saved!</p>}
                </div>
            </div>
        </>
    );
}
