import React from 'react';
import queryString from 'query-string'
import { AppBar, Box, Grid, Tab, Tabs, Modal, Button, Menu, MenuItem, ClickAwayListener } from '@material-ui/core';
import Ingredient from '../Ingredient.js';
import Logging from '../Logging.js';
import SelectedList from '../SelectedList.js';
import '../../css/components/Modal.css';

class MenuLevel2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: false,
            subcategory: false,
            InstructionModalOpen: true,
            SubmitModalOpen: false,
            anchorEl: null,
        };

        /*
         * Extract out the query string parameters.
         * Type in: http://localhost:3000/MenuLevel0?Arrangement=Alphabetical&Categories=Low_A&mTurkWorkerID=ABC
         * Expected: Alphabetical, Low_A, ABC
         */
        const queryStringParameters = queryString.parse(this.props.location.search);
        if (Object.entries(queryStringParameters).length !== 0) {
            this.arrangement = queryStringParameters.Arrangement;
            this.category_set = queryStringParameters.Categories;
            this.mTurkWorkerID = queryStringParameters.mTurkWorkerID;
        }

        this.categories = Object.keys(this.props.ingredients);
        if (this.arrangement === "Alphabetical") {
            this.categories.sort();
        }
        // this.state.category = this.categories[0];

        this.handleChangeCategoryTab = this.handleChangeCategoryTab.bind(this);
        this.handleChangeSubcategory = this.handleChangeSubcategory.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
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
        this.setState({
                category: newCategory,
                anchorEl: event.currentTarget,
        });
    }

    /*
     * Handles the change in Subategory and shows the correct subcategory content.
     */
    handleChangeSubcategory(newSubcategory) {
        this.setState({
            subcategory: newSubcategory,
            anchorEl: null,
        });
    }

    handleMenuClose(event) {
        this.setState({
            anchorEl: null,
        });
    }

    render() {
        let categoryIndex = 0;
        let subcategoryIndex = 0;
        let ingredientIndex = 0;

        const categoryTabLabelsToRender = [];
        const componentsInCategoryToRender = [];
        const subcategoryMenus = [];

        // Create the Ingredient Components at the 1-Level
        for (const category of this.categories) {
            // First we create the Category Tab.
            categoryTabLabelsToRender.push(
                <Tab style={{minWidth: 110, width: 110}} key={categoryIndex} value={category} index={category} label={category} />
            );

            if (category === this.state.category) {
                const subcategoryMenuItems = [];
                const componentsInSubcategoryToRender = [];

                // Sort the subcategories according to the arrangement
                const subcategories = Object.keys(this.props.ingredients[category]);
                if (this.arrangement === "Alphabetical") {
                    subcategories.sort();
                }

                // We get all the subcategories under the Category
                for (const subcategory of subcategories) {

                    // Generate the menu items (subcategories)
                    subcategoryMenuItems.push(
                        <MenuItem style={{height: 70, width: 250}} key={subcategory} onClick={() => this.handleChangeSubcategory(subcategory)}>{subcategory}</MenuItem>
                    );

                    if(subcategory === this.state.subcategory){
                        const ingredientsToRender = [];
                        this.props.ingredients[category][subcategory].sort();
                        // Then we get all the Ingredients under that Subategory.
                            for (const ingredientName of this.props.ingredients[category][subcategory]) {
                                ingredientsToRender.push(
                                    <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} store={this.props.store} isMenuLevel2={true} />
                                )
                                ingredientIndex++;
                            }

                            componentsInSubcategoryToRender.push(
                                <div className="SubcategoryTab" key={subcategoryIndex} value={subcategory} index={subcategory} hidden={this.state.subcategory !== subcategory}>
                                    <Grid container spacing={2}>
                                        {ingredientsToRender}
                                    </Grid>
                                </div>
                            );
                    }
                    subcategoryIndex++;
                }

                // Finally we add all Ingredients to the Category content; this only gets shown if we click the Category Tab.
                componentsInCategoryToRender.push(
                    <div className="CategoryTab" key={categoryIndex} value={category} index={category} hidden={this.state.category !== category}>
                        {componentsInSubcategoryToRender}
                    </div>
                );

                // Generate the higher order menu component containing the subcategory menu items
                subcategoryMenus.push(
                    <Menu
                        key={category}
                        getContentAnchorEl={null}
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {subcategoryMenuItems}
                    </Menu>
                );
            }
            categoryIndex++;
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

                {subcategoryMenus}

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
                        {!this.state.InstructionModalOpen ? <Logging mTurkWorkerID={this.mTurkWorkerID} store={this.props.store} menuLevel={2} arrangement={this.arrangement} category_set={this.category_set} handleSubmitButtonClick={this.handleSubmitButtonClick.bind(this)} /> : null}
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel2;
