import React from "react";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

export default function Stats() {
    const [stats, setStats] = useState();

    const someDate = new Date();
    const numberOfDaysToSubtract = 7;
    const date = someDate.setDate(someDate.getDate() - numberOfDaysToSubtract);
    const defaultValue = new Date(date).toISOString().split("T")[0]; // yyyy-mm-dd

    const today = new Date().toISOString().split("T")[0];

    function onSubmit(event) {
        event.preventDefault();
        const start_date = event.target.start.value;
        const end_date = event.target.end.value;

        fetch("/api/me/mystats/" + start_date + "/" + end_date)
            .then((response) => response.json())
            .then((data) => {
                setStats([
                    {
                        values: data.map((each) => each.work_time),
                        labels: data.map((each) => each.activity),
                        type: "pie",
                    },
                ]);
            });
    }

    console.log("stats", stats);

    return (
        <div className="stats-wrapper">
            <Plot
                data={stats}
                layout={{
                    width: 600,
                    height: 600,
                    title: "My Work Session Breakdown",
                    paper_bgcolor: "#202142",
                    font: {
                        family: "Tacoma",
                        size: 24,
                        color: "white",
                        weight: "bold",
                    },
                }}
            />
            <div className="stats-date-form">
                <form onSubmit={onSubmit}>
                    <h3>
                        Select date range to view your work session statistics
                    </h3>
                    <label for="start">Start date:</label>
                    <input
                        type="date"
                        id="start"
                        name="start"
                        defaultValue={defaultValue}
                    />

                    <label for="end">End date:</label>
                    <input
                        type="date"
                        id="end"
                        name="end"
                        defaultValue={today}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
