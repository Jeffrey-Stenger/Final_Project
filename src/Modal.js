import { useState, useEffect, useRef } from "react";

export default function Modal({ hideModal, roundDuration, activity }) {
    function closeModal() {
        hideModal();
    }

    function submitWork() {
        console.log("activity", activity);
        console.log("work_time", roundDuration);
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
                </div>
            </div>
        </>
    );
}
