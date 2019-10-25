import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import '../css/components/Ingredient.css';

/*
 * This is the actual Ingredient card that is rendered.
 */
class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    /*
     * Handles the change in Checked and adds/removes the Ingredient from the Selected List.
     */
    handleChange(event) {
      event.preventDefault()
      this.props.handleIngredientSelection(this.props.ingredientName);
    }

    render() {
        return (
            <Grid item xs={2} >
                <Card className="Ingredient" onClick={this.handleChange}>
                    <input type="checkbox" id={this.props.id} checked={this.props.isSelected}
                    onChange={e=>{}}/>
                    <label htmlFor={this.props.id}>
                        <span className="IngredientCheckbox">✔</span> <span className="IngredientName">{this.props.ingredientName}</span>
                    </label>
                </Card>
            </Grid>
        );
    }
}

export default Ingredient;
