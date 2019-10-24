import React from 'react';
import Ingredient from '../Ingredient.js';
import SelectedList from '../SelectedList.js';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';

class MenuLevel0 extends React.Component {
    render() {
        const componentsToRender = [];
        let index = 0;

        // Create the Ingredient Components at the 0-Level
        for (const category in this.props.ingredients) {
            componentsToRender.push(
                <div className="CategoryTitle">{category}</div>
            );
            for (const subcategory in this.props.ingredients[category]) {
                for (const ingredientName of this.props.ingredients[category][subcategory]) {
                    componentsToRender.push(
                        <Ingredient key={index} ingredientName={ingredientName} id={index} handleSelection={this.props.handleSelection.bind(this)} />
                    );
                    index++;
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
                        <SelectedList selectedList={this.props.selectedList} />
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default MenuLevel0;