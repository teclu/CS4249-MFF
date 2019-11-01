import React from 'react';
import queryString from 'query-string'
import { AppBar, Box, Grid, Tab, Tabs, Modal, Button } from '@material-ui/core';
import Ingredient from '../Ingredient';
import Logging from '../Logging.js';
import SelectedList from '../SelectedList.js';
import '../../css/components/Modal.css';

class MenuLevel1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Vegetables",
            InstructionModalOpen: true,
            SubmitModalOpen: false,
        };

        /*
         * Extract out the query string parameters.
         * Type in: http://localhost:3000/MenuLevel0?Arrangement=Alphabetical&Categories=Low_A&mTurkWorkerID=ABC
         * Expected: Alphabetical, Low_A, ABC
         */
        const queryStringParameters = queryString.parse(this.props.location.search);
        if (Object.entries(queryStringParameters).length !== 0) {
            this.arrangement = queryStringParameters.Arrangement;
            this.categories = queryStringParameters.Categories;
            this.mTurkWorkerID = queryStringParameters.mTurkWorkerID;
        }

        this.handleChangeCategoryTab = this.handleChangeCategoryTab.bind(this);
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

    /*
     * Handles the change in Category and shows the correct Category content.
     */
    handleChangeCategoryTab(event, newCategory) {
        this.setState(state => {
            return { category: newCategory }
        });
    }

    render() {
        const categoryTabLabelsToRender = [];
        const componentsInCategoryToRender = [];
        let categoryIndex = 0;
        let ingredientIndex = 0;

        // Create the Ingredient Components at the 1-Level
        for (const category in this.props.ingredients) {
            // First we create the Category Tab.
            categoryTabLabelsToRender.push(
                <Tab key={categoryIndex} value={category} index={category} label={category} />
            );

            // Only (re)render components of the currently selected category
            if (category === this.state.category){
                // Then we get all the Ingredients under that Category.
                let ingredientsPerCategory = [];
                const ingredientsToRender = [];

                for (const subcategory in this.props.ingredients[category]) {
                    for (const ingredientName of this.props.ingredients[category][subcategory]) {
                        ingredientsPerCategory.push(ingredientName);
                    }
                }
                // Sort them
                ingredientsPerCategory.sort();
            
                // Then add to the list of ingredient components
                for (const ingredientName of ingredientsPerCategory) {
                    ingredientsToRender.push(
                        <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} store={this.props.store} />
                    );
                    ingredientIndex++;
                }

                // Finally we add all Ingredients to the Category content; this only gets shown if we click the Category Tab.
                componentsInCategoryToRender.push(
                    <div className="CategoryTab" key={categoryIndex} value={category} index={category} hidden={this.state.category !== category}>
                        <Grid container spacing={2}>
                            {ingredientsToRender}
                        </Grid>
                    </div>
                );
            }
            categoryIndex++;
        }

        return (
            <Box>
                <Modal open={this.state.InstructionModalOpen}>
                    <div className="OverlayModal">
                        <p>When you click <b>Start</b>, the interface for the task will be revealed.</p>
                        <div style={{marginBottom: "32px"}}>Click <b>Start</b> when you are ready!</div>
                        <Button variant="contained" color="primary" onClick={this.handleStartButtonClick.bind(this)}>Start</Button>
                    </div>
                </Modal>
                <Modal open={this.state.SubmitModalOpen}>
                    <div className="OverlayModal">
                        <p>You have completed this task! Continue with the survey.</p>
                    </div>
                </Modal>
                <AppBar position="fixed">
                    <Tabs value={this.state.category} onChange={this.handleChangeCategoryTab}>
                        {categoryTabLabelsToRender}
                    </Tabs>
                </AppBar>
                <div className="AppBarOffset"></div>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        {componentsInCategoryToRender}
                    </Grid>
                    <Grid item xs={3}>
                        <SelectedList store={this.props.store} />
                        <Logging mTurkWorkerID={this.mTurkWorkerID} store={this.props.store} menuLevel={1} arrangement={this.arrangement} categories={this.categories} handleSubmitButtonClick={this.handleSubmitButtonClick.bind(this)}/>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel1;
