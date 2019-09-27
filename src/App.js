import React from 'react';
import Ingredient from './components/Ingredient.js'
import './css/App.css';

function App() {
    // For testing purposes. More changes to come.
    const ingredientNames = ['Apple', 'Banana', 'Cucumber', 'Durian', 'Fig', 'Gooseberry', 'Orange', 'Pineapple', 'Raspberry'];
    const ingredientsToRender = [];

    for (const [index, value] of ingredientNames.entries()) {
        ingredientsToRender.push(
            <Ingredient name={value} id={index} />
        )
    }

    return (
        <div className="App">
            {ingredientsToRender}
        </div>
    );
}

export default App;
