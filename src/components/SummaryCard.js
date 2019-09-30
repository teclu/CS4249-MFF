import React from 'react';
import '../css/SummaryCard.css';

class SummaryCard extends React.Component {

    render() {
      const items = this.props.ingredientList.map(item => <div>{item}</div>)
      console.log()
        return (
            <div className="SummaryCard">
              {items}
            </div>
        );
    }
}

export default SummaryCard;
