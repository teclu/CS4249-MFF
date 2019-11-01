import React from 'react';
import queryString from 'query-string'
import Box from '@material-ui/core/Box';
import SpecifiedIngredientsTasks from '../SpecifiedIngredientsTasks.js'
import '../css/SpecifiedIngredientsTasks.css';

/*
 * This records the background DVs we want to measure and also acts as a sender to the Google Forms.
 * Type in: http://localhost:3000/InstructionTask?Categories=Low_B
 * Expected: Select the following ingredients: Garlic, Carrot, Portabello, Cauliflower, Jalapenos Peppers.
 */
class SpecifiedIngredientsTask extends React.Component {
    render() {
        const queryStringParameters = queryString.parse(this.props.location.search);
        const specifiedIngredients = SpecifiedIngredientsTasks[queryStringParameters.Categories];
        let instructionToRender = [];
        instructionToRender.push(<p>Select the following ingredients (the order does not matter):</p>)

        // Randomise the Ingredients' order.
        specifiedIngredients.sort(() => Math.random() - 0.5);

        // Append the Ingredients to the instruction string.
        for (const specifiedIngredient of specifiedIngredients) {
            instructionToRender.push(<li className="SpecifiedIngredient">{specifiedIngredient}</li>);
        }

        return (
            <Box className="InstructionToRender">
                <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
                {instructionToRender}
            </Box>
        );
    }
}

export default SpecifiedIngredientsTask;