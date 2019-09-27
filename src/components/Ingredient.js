import React from 'react';
import '../css/Ingredient.css';

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };

        this.ingredientSelection = this.ingredientSelection.bind(this);
    }

    ingredientSelection(event) {
        this.setState(state => ({
            isSelected: !state.isSelected
        }));
    }

    render() {
        return (
            <div className="Ingredient" onClick={this.ingredientSelection}>
                <input type="checkbox" id={this.props.id} name="isSelected" checked={this.state.isSelected} onChange={this.ingredientSelection} />
                <label htmlFor={this.props.id}>
                    <span className="IngredientCheckbox">✔</span> <span className="IngredientTitle">{this.props.name}</span>
                </label>
            </div>
        );
    }
}

export default Ingredient;
