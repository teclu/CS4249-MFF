import React from 'react';
import '../css/Ingredient.css';

class Ingredient extends React.Component {

    render() {
        return (
            <div className="Ingredient" onClick={() => this.props.handleChange(this.props.name)}>
                <input type="checkbox" id={this.props.id} name="isSelected" checked={this.props.isSelected} />
                <label htmlFor={this.props.id}>
                    <span className="IngredientCheckbox">✔</span> <span className="IngredientTitle">{this.props.name}</span>
                </label>
            </div>
        );
    }
}

export default Ingredient;
