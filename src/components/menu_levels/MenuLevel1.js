import React from 'react';
import queryString from 'query-string'
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Ingredient from '../Ingredient';
import Logging from '../Logging.js';
import SelectedList from '../SelectedList.js';

class MenuLevel1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Vegetables"
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

            // Then we get all the Ingredients under that Category.
            const ingredientsToRender = [];
            for (const subcategory in this.props.ingredients[category]) {
                for (const ingredientName of this.props.ingredients[category][subcategory]) {
                    ingredientsToRender.push(
                        <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} handleIngredientSelection={this.props.handleIngredientSelection.bind(this)} hidden={this.state.category !== category} />
                    )
                    ingredientIndex++;
                }
            }

            // Finally we add all Ingredients to the Category content; this only gets shown if we click the Category Tab.
            componentsInCategoryToRender.push(
                <div className="CategoryTab" key={categoryIndex} value={category} index={category} hidden={this.state.category !== category}>
                    <Grid container spacing={1}>
                        <div className="CategoryTitle">{category}</div>
                        {ingredientsToRender}
                    </Grid>
                </div>
            );
            categoryIndex++;
        }

        return (
            <Box>
                <AppBar position="fixed">
                    <Tabs value={this.state.category} onChange={this.handleChangeCategoryTab}>
                        {categoryTabLabelsToRender}
                    </Tabs>
                </AppBar>
                <div className="AppBarOffset"></div>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        {componentsInCategoryToRender}
                    </Grid>
                    <Grid item xs={2}>
                        <SelectedList selectedList={this.props.selectedList} />
                        <Logging mTurkWorkerID={this.mTurkWorkerID} selectedList={this.props.selectedList} menuLevel={1} arrangement={this.arrangement} categories={this.categories} />
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel1;