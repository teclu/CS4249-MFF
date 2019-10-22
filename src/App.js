import React from 'react';
import Ingredient from './components/Ingredient.js';
import SelectedList from './components/SelectedList.js';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import './css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ingredients = require('./Ingredients.json'); // Import the Ingredients JSON File.
        this.state = {
            selectedList: [] // This keeps track of all the selected Ingredients' Names.
        }
    }

    /*
     * This function is passed down to any Ingredient so that it can modify the SelectedList.
     */
    handleSelection(ingredientName, isSelected) {
        this.setState(state => {
            const selectedListCopy = state.selectedList;

            // If an Ingredient has been Selected, push its Name onto the SelectedList and sort it alphabetically.
            if (isSelected) {
                selectedListCopy.push(ingredientName);
                selectedListCopy.sort();
            }
            // Else we remove the Ingredient's Name from the SelectedList.
            else {
                selectedListCopy.splice(selectedListCopy.indexOf(ingredientName), 1);
            }
            // Finally, return the modified SelectedList.
            return { selectedList: selectedListCopy }
        });
    }

    render() {
        const componentsToRender = [];
        let index = 0;

        // Create the Ingredient Components at the 0-Level
        for (const category in this.ingredients) {
            componentsToRender.push(
                <div className="CategoryTitle">{category}</div>
            );
            for (const subcategory in this.ingredients[category]) {
                for (const ingredientName of this.ingredients[category][subcategory]) {
                    componentsToRender.push(
                        <Ingredient key={index} ingredientName={ingredientName} id={index} handleSelection={this.handleSelection.bind(this)} />
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
                        <SelectedList selectedList={this.state.selectedList} />
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default App;
