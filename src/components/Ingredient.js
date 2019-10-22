import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import '../css/components/Ingredient.css';

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    /*
     * Handles the change in Checked and adds/removes the Ingredient from the Selected List.
     */
    handleChange(event) {
        this.setState(state => {
            this.props.handleSelection(this.props.ingredientName, !state.isSelected);
            return { isSelected: !state.isSelected }
        });
    }

    render() {
        return (
            <Grid item xs={2}>
                <Card className="Ingredient" onClick={this.handleChange}>
                    <input type="checkbox" id={this.props.id} checked={this.state.isSelected} onChange={this.handleChange} />
                    <label htmlFor={this.props.id}>
                        <span className="IngredientCheckbox">✔</span> <span className="IngredientName">{this.props.ingredientName}</span>
                    </label>
                </Card>
            </Grid>
        );
    }
}

export default Ingredient;
