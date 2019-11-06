import React from 'react';
import queryString from 'query-string'
import Ingredient from '../Ingredient.js';
import Logging from '../Logging.js';
import SelectedList from '../SelectedList.js';
import { Grid, Box, Modal, Button } from '@material-ui/core';
import '../../css/components/Modal.css';

class MenuLevel0 extends React.Component {
    constructor(props) {
        super(props);

        /*
         * Extract out the query string parameters.
         * Type in: http://localhost:3000/MenuLevel0?Arrangement=Alphabetical&Categories=Low_A&mTurkWorkerID=ABC
         * Expected: Alphabetical, Low_A, ABC
         */
        const queryStringParameters = queryString.parse(this.props.location.search);
        if (Object.entries(queryStringParameters).length !== 0) {
            this.arrangement = queryStringParameters.Arrangement; // Alphabetical or Common
            this.category_set = queryStringParameters.Categories;
            this.mTurkWorkerID = queryStringParameters.mTurkWorkerID;
        }

        this.categories = Object.keys(this.props.ingredients);
        if (this.arrangement === "Alphabetical") {
            this.categories.sort();
        }

        this.state = {
            InstructionModalOpen: true,
            SubmitModalOpen: false,
        }
    }

    handleStartButtonClick() {
        this.setState({
            InstructionModalOpen: false,
        });
    }

    handleSubmitButtonClick() {
        this.setState({
            SubmitModalOpen: true,
        })
    }

    render() {
        const componentsToRender = [];
        let ingredientIndex = 0;

        // Create the Ingredient Components at the 0-Level
        for (const category of this.categories) {
            // First we create the Category title.
            componentsToRender.push(
                <div key={category} className="CategoryTitle">{category}</div>
            );

            // Then we simply add all the ingredients under that Category.
            const ingredientsPerCategory = [];
            for (const subcategory in this.props.ingredients[category]) {
                for (const ingredientName of this.props.ingredients[category][subcategory]) {
                    ingredientsPerCategory.push(ingredientName);
                }
            }
            // Sort them
            ingredientsPerCategory.sort();

            // Then add to the list of ingredient components
            for (const ingredientName of ingredientsPerCategory) {
                componentsToRender.push(
                    <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} store={this.props.store} />
                );
                ingredientIndex++;
            }
        }

        return (
            <Box>
                <Modal open={this.state.InstructionModalOpen}>
                    <div className="OverlayModal">
                        <p>When you click <b>Start</b>, the interface for the task will be revealed.</p>
                        <div style={{ marginBottom: "32px" }}>Click <b>Start</b> when you are ready!</div>
                        <Button variant="contained" color="primary" onClick={this.handleStartButtonClick.bind(this)}>Start</Button>
                    </div>
                </Modal>
                <Modal open={this.state.SubmitModalOpen}>
                    <div className="OverlayModal">
                        <p>You have completed this task! Continue with the survey.</p>
                    </div>
                </Modal>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Grid container spacing={2}>
                            {componentsToRender}
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ position: "fixed", width: "22.5%" }}>
                            <SelectedList store={this.props.store} />
                            {!this.state.InstructionModalOpen ? <Logging mTurkWorkerID={this.mTurkWorkerID} store={this.props.store} menuLevel={0} arrangement={this.arrangement} category_set={this.category_set} handleSubmitButtonClick={this.handleSubmitButtonClick.bind(this)} /> : null}
                        </div>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel0;
