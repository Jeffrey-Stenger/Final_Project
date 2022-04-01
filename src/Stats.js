import React from "react";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";

export default function Stats() {
    const [stats, setStats] = useState();
    const [defaultChartRange, setDefaultChartRange] = useState(true);

    const someDate = new Date();
    const numberOfDaysToSubtract = 7;
    const date = someDate.setDate(someDate.getDate() - numberOfDaysToSubtract);
    const weekAgo = new Date(date).toISOString().split("T")[0]; // yyyy-mm-dd

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        fetch("/api/me/mystats/" + weekAgo + "/" + today)
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
    }, []);

    function onSubmit(event) {
        event.preventDefault();
        setDefaultChartRange(false);
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
            {!defaultChartRange ? (
                <Plot
                    data={stats}
                    layout={{
                        // autosize: true,
                        automargin: true,
                        width: 700,
                        height: 600,
                        title: "My Work Sessions Breakdown",
                        paper_bgcolor: "#202142",
                        font: {
                            family: "Poppins",
                            size: 18,
                            color: "white",
                            weight: "bold",
                        },
                        legend: {
                            width: 100,
                            x: 1,
                        },
                    }}
                />
            ) : (
                <Plot
                    data={stats}
                    layout={{
                        // autosize: true,

                        automargin: true,
                        width: 700,
                        height: 600,
                        title: "My Work Sessions for the Past Week",
                        paper_bgcolor: "#202142",
                        font: {
                            family: "Poppins",
                            size: 18,
                            color: "white",
                            weight: "bold",
                        },
                        legend: {
                            width: 100,
                            x: 1,
                        },
                    }}
                />
            )}
            <div className="stats-date-form">
                <form onSubmit={onSubmit}>
                    <h3>Or select a custom date range</h3>
                    <label for="start">Start date:</label>
                    <input
                        type="date"
                        id="start"
                        name="start"
                        defaultValue={weekAgo}
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
