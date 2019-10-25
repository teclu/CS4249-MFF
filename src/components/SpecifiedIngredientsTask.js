import React from 'react';
import queryString from 'query-string'
import Box from '@material-ui/core/Box';

/*
 * This records the background DVs we want to measure and also acts as a sender to the Google Forms.
 * Type in: http://localhost:3000/InstructionTask?Categories=Low_B
 * Expected: Select the following ingredients: Garlic, Carrot, Portabello, Cauliflower, Jalapenos Peppers.
 */
class SpecifiedIngredientsTasks extends React.Component {
    render() {
        const queryStringParameters = queryString.parse(this.props.location.search);
        const specifiedIngredients = (require('../SpecifiedIngredientsTasks.json'))[queryStringParameters.Categories];
        let instructionToRender = "Select the following ingredients: ";

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

export default SpecifiedIngredientsTasks;