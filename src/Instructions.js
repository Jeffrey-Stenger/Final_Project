export default function Instructions() {
    return (
        <div className="instructions-wrapper">
            <h1>Instructions</h1>
            <div>
                <h2>Timer</h2>
                <p>
                    The timer will begin to countdown upon pressing the Start
                    button. Likewise, the countdown will pause when the Pause
                    button is pressed The Reser Timer button sets the current
                    timer back to the chosen duration.
                </p>
            </div>
            <div>
                <h2>Settings</h2>
                <p>
                    Here select your desired work session duration and the
                    corresponding activity.
                </p>
                <p>Both fields are required prior to starting the timer.</p>
            </div>
            <div>
                <h2>Statistics</h2>
                <p>
                    You can view the breakdown of your work session activities
                    here.
                    <br />
                    By default the past week is shown, but you can choose a
                    custom date range at the bottom.
                </p>
            </div>
        </div>
    );
}
