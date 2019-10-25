import React from 'react';
import queryString from 'query-string'
import Box from '@material-ui/core/Box';
import SpecifiedIngredientsTasks from '../SpecifiedIngredientsTasks.js'

/*
 * This records the background DVs we want to measure and also acts as a sender to the Google Forms.
 * Type in: http://localhost:3000/InstructionTask?Categories=Low_B
 * Expected: Select the following ingredients: Garlic, Carrot, Portabello, Cauliflower, Jalapenos Peppers.
 */
class SpecifiedIngredientsTask extends React.Component {
    render() {
        const queryStringParameters = queryString.parse(this.props.location.search);
        const specifiedIngredients = SpecifiedIngredientsTasks[queryStringParameters.Categories];
        let instructionToRender = "Select the following ingredients: ";

        // Randomise the Ingredients' order.
        specifiedIngredients.sort(() => Math.random() - 0.5);

        // Append the Ingredients to the instruction string.
        for (const specifiedIngredient of specifiedIngredients) {
            instructionToRender = instructionToRender.concat(specifiedIngredient);
            if (specifiedIngredients.indexOf(specifiedIngredient) !== specifiedIngredients.length - 1) {
                instructionToRender = instructionToRender.concat(', ');
            }
            else {
                instructionToRender = instructionToRender.concat('.');
            }
        }

        return (
            <Box>
                {instructionToRender}
            </Box>
        );
    }
}

export default SpecifiedIngredientsTask;