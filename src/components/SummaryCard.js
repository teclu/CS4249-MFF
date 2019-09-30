import React from 'react';
import '../css/Ingredient.css';

class SummaryCard extends React.Component {

    render() {
      const items = this.props.ingredientList.map(item => <div>{item}</div>)
      console.log()
        return (
            <div>
              {items}
            </div>
        );
    }
}

export default SummaryCard;
