import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import {
    addToSelected,
    removeFromSelected,
} from '../actions';
import '../css/components/Ingredient.css';
import { CardContent, Checkbox } from '@material-ui/core';

/*
 * This is the actual Ingredient card that is rendered.
 */
class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isSelected: this.props.store.getState().includes(this.props.ingredientName)
        }
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
            <Grid item xs={this.props.isMenuLevel2 ? 4 : 3}>
                {this.state.isSelected ? 
                    <Card id={this.props.id} onClick={this.handleChange}>
                        <CardContent style={{ background: "#4db6ac", color: "white", fontWeight: 'bold' }} className="Ingredient">{this.props.ingredientName}</CardContent>
                    </Card> :
                    <Card id={this.props.id} onClick={this.handleChange}>
                        <CardContent className="Ingredient">{this.props.ingredientName}</CardContent>
                    </Card>
                }
            </Grid>
        );
    }
}

export default Ingredient;
