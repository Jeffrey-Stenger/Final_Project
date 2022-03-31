import React from "react";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

export default function Stats() {
    let stats;

    function onSubmit(event) {
        event.preventDefault();
        const start_date = event.target.start.value;
        const end_date = event.target.end.value;

        fetch("/api/me/mystats/" + start_date + "/" + end_date)
            .then((response) => response.json())
            .then((data) => {
                console.log("data retrieved", data);

                const workLengths = data.map((item) => {
                    return item.work_time;
                });

                const activities = data.map((item) => {
                    return item.activity;
                });
                console.log("workLengths", workLengths);
                console.log("activities", activities);
                stats = [
                    {
                        values: workLengths,
                        labels: activities,
                        type: "pie",
                    },
                ];

                return stats;
            });
        return stats;
    }

    const showStats = stats;

    return (
        <div className="stats-wrapper">
            <Plot
                data={stats}
                layout={{
                    width: 500,
                    height: 500,
                    title: "My Time Breakdown",
                }}
            />
            <p>{console.log(showStats)}</p>
            <div className="stats-date-form">
                <form onSubmit={onSubmit}>
                    <h3>
                        Select date range to view your work session breakdown
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
