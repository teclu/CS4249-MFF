import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MenuLevel0 from './components/menu_levels/MenuLevel0.js';
import MenuLevel1 from './components/menu_levels/MenuLevel1.js';
import MenuLevel2 from './components/menu_levels/MenuLevel2.js';
import SpecifiedIngredientsTasks from './components/SpecifiedIngredientsTask.js';
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
    handleIngredientSelection(ingredientName, isSelected) {
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
        return (
            <Router>
                <Switch>
                    <Route path="/MenuLevel0" render={(props) => <MenuLevel0 {...props} ingredients={this.ingredients} selectedList={this.state.selectedList} handleIngredientSelection={this.handleIngredientSelection.bind(this)} />} />
                    <Route path="/MenuLevel1" render={(props) => <MenuLevel1 {...props} ingredients={this.ingredients} selectedList={this.state.selectedList} handleIngredientSelection={this.handleIngredientSelection.bind(this)} />} />
                    <Route path="/MenuLevel2" render={(props) => <MenuLevel2 {...props} ingredients={this.ingredients} selectedList={this.state.selectedList} handleIngredientSelection={this.handleIngredientSelection.bind(this)} />} />
                    <Route path="/InstructionTask" render={(props => <SpecifiedIngredientsTasks {...props} />)} />
                </Switch>
            </Router>
        );
    }
}

export default App;
