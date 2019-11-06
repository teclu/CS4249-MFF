import React from 'react';
import queryString from 'query-string'
import { Box, Grid, List, ListItem, ListItemText, Tab, Tabs, Modal, Button, Collapse } from '@material-ui/core';
import Ingredient from '../Ingredient.js';
import Logging from '../Logging.js';
import SelectedList from '../SelectedList.js';
import '../../css/components/Modal.css';
import '../../css/components/MenuLevels.css';

class MenuLevel2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Vegetables",
            subcategory: false,
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
            this.category_set = queryStringParameters.Categories;
            this.mTurkWorkerID = queryStringParameters.mTurkWorkerID;
        }

        this.categories = Object.keys(this.props.ingredients);
        if (this.arrangement === "Alphabetical") {
            this.categories.sort();
        }
        this.state.category = this.categories[0];

        this.handleChangeCategoryTab = this.handleChangeCategoryTab.bind(this);
        this.handleChangeSubcategoryTab = this.handleChangeSubcategoryTab.bind(this);
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
    handleChangeCategoryTab(newCategory) {
      if(this.state.category !== newCategory){
        this.setState(state => {
            return {
                category: newCategory
            }
        });
      }else{
        this.setState(state => {
            return {
                category: false
            }
        });
      }
    }

    /*
     * Handles the change in Subcategory and shows the correct subcategory content.
     */
    handleChangeSubcategoryTab(newSubcategory) {
        this.setState(state => {
            return { subcategory: newSubcategory }
        });
    }


    render() {
        let categoryIndex = 0;
        let subcategoryIndex = 0;
        let ingredientIndex = 0;

        const categoryTabLabelsToRender = [];
        const componentsInSubcategoryToRender = [];
        // Create the Ingredient Components at the 1-Level
        for (const category of this.categories) {
            // First we create the Category Tab.
            categoryTabLabelsToRender.push(
              <ListItem button type="button" className="categoryButton" selected={category===this.state.category} value={category} key={category} onClick={()=>this.handleChangeCategoryTab(category)} divider>
                    <ListItemText primary={category} />
              </ListItem>
            );

            const subcategoryTabLabelsToRender = [];
            // We get all the subcategories under the Category
            for (const subcategory in this.props.ingredients[category]) {
                subcategoryTabLabelsToRender.push(
                    <ListItem button type="button"  className='nested' selected={subcategory===this.state.subcategory} value={subcategory} key={subcategory} onClick={()=>this.handleChangeSubcategoryTab(subcategory)}>
                        <ListItemText primary={subcategory} />
                    </ListItem>
                );

                const ingredientsToRender = [];
                if (subcategory === this.state.subcategory) {
                    this.props.ingredients[category][subcategory].sort();
                    // Then we get all the Ingredients under that Subategory.
                        for (const ingredientName of this.props.ingredients[category][subcategory]) {
                            ingredientsToRender.push(
                                <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} store={this.props.store} hidden={this.state.subcategory !== subcategory} isMenuLevel2={true} />
                            )
                            ingredientIndex++;
                        }
                    subcategoryIndex++;
                }

                componentsInSubcategoryToRender.push(
                    <Grid container spacing={(this.state.subcategory === subcategory) ? 1 : 0}>
                        {ingredientsToRender}
                    </Grid>
                );
                subcategoryIndex++;
            }

            categoryTabLabelsToRender.push(
              <Collapse in={category === this.state.category} key={categoryIndex}>
                <List component="div" disablePadding>
                    {subcategoryTabLabelsToRender}
                </List>
              </Collapse>
            );
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

                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <Grid container spacing={1}>
                            <Grid item xs ={3}>
                              <List component="nav" aria-labelledby="nested-list-subheader">
                                  {categoryTabLabelsToRender}
                              </List>
                            </Grid>
                            <Grid item xs ={9}>
                                {componentsInSubcategoryToRender}
                            </Grid>
                        </Grid>
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
