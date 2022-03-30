// import { useEffect, useState } from "react";
import { Component } from "react";

export default class UpdateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            activity: "",
        };
        // bind things!
        this.toggleEdit = this.toggleEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing,
            activity: this.props.activity,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("onFormSubmit", event.target.editactivity.value);
        // extract the bio as event.target.[textareaNAme].value
        const udpatedActivity = event.target.editactivity.value;
        // make the right HTTP call
        // call the function passed as a prop
        this.props.updateActivity(udpatedActivity);

        fetch("/api/me/activity", {
            method: "POST",
            body: JSON.stringify({ activity: udpatedActivity }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.toggleEdit();
                console.log("SUCCESS POST");
                return data;
            });
    }
    render() {
        return (
            <div className="activity-container">
                <h2>What are you working on today?</h2>
                {this.state.isEditing ? (
                    <div className="edit-mode">
                        <form onSubmit={this.onSubmit}>
                            <textarea
                                defaultValue={this.props.bio}
                                className="input-field"
                                name="editactivity"
                            />
                            <div>
                                <button type="submit" onClick={this.toggleEdit}>
                                    Save Activity
                                </button>
                                <button onClick={this.toggleEdit}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="display-edit">
                        <p>{this.props.activity}</p>

                        <button onClick={this.toggleEdit}>Add Activity</button>
                    </div>
                )}
            </div>
        );
    }
}
