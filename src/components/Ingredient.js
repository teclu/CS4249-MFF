import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import {
    addToSelected,
    removeFromSelected,
} from '../actions';
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
    handleChange() {
        this.setState(state => {
            if (!state.isSelected) {
                this.props.store.dispatch(addToSelected(this.props.ingredientName));
            } else {
                this.props.store.dispatch(removeFromSelected(this.props.ingredientName));
            }
            return { isSelected: !state.isSelected };
        });
    }

    render() {
        return (
            <Grid item xs={2}>
                <Card className="Ingredient">
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
