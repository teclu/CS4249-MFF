import React from 'react';
import queryString from 'query-string'
import Ingredient from '../Ingredient.js';
import Logging from '../Logging.js';
import SelectedList from '../SelectedList.js';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

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
            this.arrangement = queryStringParameters.Arrangement;
            this.categories = queryStringParameters.Categories;
            this.mTurkWorkerID = queryStringParameters.mTurkWorkerID;
        }
    }

    render() {
        const componentsToRender = [];
        let ingredientIndex = 0;

        // Create the Ingredient Components at the 0-Level
        for (const category in this.props.ingredients) {
            // First we create the Category title.
            componentsToRender.push(
                <div key={category} className="CategoryTitle">{category}</div>
            );

            // Then we simply add all the ingredients under that Category.
            for (const subcategory in this.props.ingredients[category]) {
                for (const ingredientName of this.props.ingredients[category][subcategory]) {
                    componentsToRender.push(
                        <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} store={this.props.store} />
                    );
                    ingredientIndex++;
                }
            }
        }

        return (
            <Box>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Grid container spacing={1}>
                            {componentsToRender}
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <SelectedList store={this.props.store} />
                        <Logging mTurkWorkerID={this.mTurkWorkerID} store={this.props.store} menuLevel={0} arrangement={this.arrangement} categories={this.categories} />
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel0;
