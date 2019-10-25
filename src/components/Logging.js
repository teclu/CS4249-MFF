import React from 'react';
import Button from '@material-ui/core/Button';

/*
 * This records the background DVs we want to measure and also acts as a sender to the Google Forms.
 */
class Logging extends React.Component {
    constructor(props) {
        super(props);

        // Initialise data we are going to log.
        this.startTime = new Date();
        this.totalClicks = 0;
        this.idealClicks = 13; // Placeholder Number for now; this has to be manually calculated.
        this.misclicks = -1; // Placeholder Number for now.

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleOnClickSendLoggingData = this.handleOnClickSendLoggingData.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /*
     * Listens for mousedown presses and increments the total number of clicks.
     */
    handleClickOutside(event) {
        this.totalClicks++;
    }

    /*
     * Sends the logged data to the Google Form.
     */
    handleOnClickSendLoggingData(event) {
        // Do not send any logging data if the mTurkWorkerID is null.
        if (this.props.mTurkWorkerID === undefined) {
            return;
        }

        const formID = "e/1FAIpQLSdG-RITTtCGYcO3LowXhT-9MUYrNtDDvrCNK51fDqtbXJpytQ";
        const data = {
            "entry.312909528": this.props.mTurkWorkerID, // mTurkWorkerID
            "entry.203482683": this.props.menuLevel, // Menu Level = { 0, 1, 2 }
            "entry.1431340849": this.props.arrangement, // Arrangement = { Alphabetical, Common_First }
            "entry.975941733": this.props.categories, // Categories = { Low_X, High_X }
            "entry.1597354442": (new Date() - this.startTime) / 1000, // Time Taken (s)
            "entry.3846495": this.totalClicks, // Total number of Clicks
            "entry.1622141363": this.misclicks, // Total number of Misclicks
            "entry.2000979147": this.idealClicks, // Ideal Clicks to complete the Task
            "entry.535203847": -1, // Task Correctness (%); to be done!
            "entry.1814249455": 100 * (1 - Math.abs(this.totalClicks - this.idealClicks) / this.idealClicks), // Efficiency (%)
            "entry.585530140": (this.props.selectedList.length > 0) ? this.props.selectedList.join(', ') : "None" // Ingredients Selected and Submitted
        };
        const parameters = [];
        for (const key in data) {
            parameters.push(key + "=" + encodeURIComponent(data[key]));
        }
        // Submit the form using an image to avoid CORS warnings; warning may still happen, but log will be sent. Go check result in Google Form
        const submitForm = new Image();
        submitForm.src = "https://docs.google.com/forms/d/" + formID + "/formResponse?" + parameters.join("&");
    }

    render() {
        return (
            <Button variant="contained" color="primary" className="SubmitButton" onClick={this.handleOnClickSendLoggingData}>
                Submit
            </Button>
        );
    }
}

export default Logging;
