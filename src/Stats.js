import React from "react";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

export default function Stats() {
    const [stats, setStats] = useState();

    function onSubmit(event) {
        event.preventDefault();
        const start_date = event.target.start.value;
        const end_date = event.target.end.value;

        fetch("/api/me/mystats/" + start_date + "/" + end_date)
            .then((response) => response.json())
            .then((data) => {
                console.log("data retrieved", data);

                // const workLengths = data.map((item) => {
                //     return item.work_time;
                // });

                // const activities = data.map((item) => {
                //     return item.activity;
                // });
                // console.log("workLengths", workLengths);
                // console.log("activities", activities);
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
                    <input type="date" id="start" name="start" />

                    <label for="end">End date:</label>
                    <input type="date" id="end" name="end" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
