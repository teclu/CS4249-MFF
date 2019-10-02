import React from 'react';
import '../css/Card.css';
import Ingredient from './Ingredient.js'

class Card extends React.Component {
    constructor() {
        super();
        this.state = { open: false, stayOpen: false };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(){
      this.setState(()=>({open:true}))
    }
    handleMouseLeave(){
      this.setState(()=>({open:false}))
    }


    render() {

        return (
          <div className="card-holder">
            <div className="card" onMouseLeave={!this.props.stayOpen ? this.handleMouseLeave : undefined}>
              <div
                className="collapsible"
                onMouseEnter={this.handleMouseEnter}>
                  <div className="card-header" onClick={()=>this.props.handleChange(this.props.subcategory)}>
                      <input type="checkbox" id={this.props.id} name="isSelected" checked={this.props.isSelected}/>
                      <label htmlFor={this.props.id}>
                          <span className="card-checkbox">✔</span> <span className="card-title">{this.props.subcategory}</span>
                      </label>
                  </div>
              </div>
              <div className={"content"+( this.state.open? " ":" closed")} >
                {this.props.items}
              </div>
            </div>
          </div>
        );
    }
}

export default Card;
