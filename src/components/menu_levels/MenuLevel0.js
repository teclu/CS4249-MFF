import React from 'react';
import queryString from 'query-string'
import Ingredient from '../Ingredient.js';
import SelectedList from '../SelectedList.js';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

class MenuLevel0 extends React.Component {
    /*
     * Sample function to extract out the query string parameters.
     * Type in: http://localhost:3000/MenuLevel0?Arrangement=Alphabetical&Categories=Low_7_1
     * Expected: Alphabetical, Low_7_1
     */
    checkQueryString() {
        const queryStringParameters = queryString.parse(this.props.location.search)
        console.log(queryStringParameters.Arrangement);
        console.log(queryStringParameters.Categories);
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
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel0;