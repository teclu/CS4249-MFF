import React from 'react';
import Button from '@material-ui/core/Button';
import SpecifiedIngredientsTasks from '../SpecifiedIngredientsTasks.js'

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
        this.specifiedIngredients = SpecifiedIngredientsTasks[this.props.categories];
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleOnClickSendLoggingData = this.handleOnClickSendLoggingData.bind(this);
        this.state = {
            submitted: false,
        };
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
        this.setState({ submitted: true });
        this.props.handleSubmitButtonClick();

        // Retrieve current selected list from store
        let selectedList = this.props.store.getState();

        // Do not send any logging data if the mTurkWorkerID is null.
        if (this.props.mTurkWorkerID === undefined) {
            return;
        }

        // Get all the Ingredients that were specified and were selected.
        const ingredientsSpecifiedSelected = selectedList.filter(selectedIngredient => {
            return this.specifiedIngredients.includes(selectedIngredient);
        });

        // Get all the Ingredients that were specified but were not selected.
        const ingredientsSpecifiedNotSelected = selectedList.filter(selectedIngredient => {
            return !this.specifiedIngredients.includes(selectedIngredient);
        });

        // Get all the ingredients that were not specified and were still selected.
        const ingredientsNotSpecifiedSelected = selectedList.filter(selectedIngredient => {
            return !this.specifiedIngredients.includes(selectedIngredient);
        });

        // Sort all ingredient arrays.
        this.specifiedIngredients.sort();
        ingredientsSpecifiedSelected.sort();
        ingredientsSpecifiedNotSelected.sort();
        ingredientsNotSpecifiedSelected.sort();

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
            "entry.1814249455": 100 * (1 - Math.abs(this.totalClicks - this.idealClicks) / this.idealClicks), // Click Efficiency (%)
            "entry.229369407": (this.specifiedIngredients.length > 0) ? this.specifiedIngredients.join(', ') : "None", // Ingredients Specified in the Task
            "entry.585530140": (selectedList.length > 0) ? selectedList.join(', ') : "None", // Ingredients Selected and Submitted
            "entry.2093943323": (ingredientsSpecifiedSelected.length > 0) ? ingredientsSpecifiedSelected.join(', ') : "None", // Ingredients Specified that were selected.
            "entry.108927114": (ingredientsSpecifiedNotSelected.length > 0) ? ingredientsSpecifiedNotSelected.join(', ') : "None",
            "entry.1280302377": 100 * (ingredientsSpecifiedSelected.length / this.specifiedIngredients.length), // Ingredients Specified Selected (%).
            "entry.1304306131": (ingredientsNotSpecifiedSelected.length > 0) ? ingredientsNotSpecifiedSelected.join(', ') : "None", // Ingredients Not Specified that were selected.
            "entry.44373570": 100 * ingredientsSpecifiedSelected.length / (selectedList.length + ingredientsSpecifiedNotSelected.length), // Task Correctness (%)
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
            <Button variant="contained" color="primary" disabled={this.state.submitted} className="SubmitButton" onClick={this.handleOnClickSendLoggingData}>
                Submit
            </Button>
        );
    }
}

export default Logging;
