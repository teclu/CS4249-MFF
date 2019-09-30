import React from 'react';
import Ingredient from './components/Ingredient.js'
import SummaryCard from './components/SummaryCard.js'
import './css/App.css';

class App extends React.Component {
    // For testing purposes. More changes to come.
    constructor(){
      super()
      this.state ={
        selectedItems:[]
      }
      this.ingredientList = []

      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
      const data = require('./Ingredients.json');
      let ingredients =[]

      for (const tab in data){
        for (const category in data[tab]){
          for (const subcategory in data[tab][category]){
            for(const ingredient of data[tab][category][subcategory]){
              ingredients.push(this.snakeToPascal(ingredient))
              this.ingredientList.push(this.snakeToPascal(ingredient))
            }
          }
        }
      }

      this.setState(()=>({ingredientList:ingredients}))

    }

    handleChange(name){
        if(this.state.selectedItems.includes(name)){
          this.setState(prevState => ({
              selectedItems: prevState.selectedItems.filter((x) => x !== name)
          }));
        }
        else{
          this.setState(prevState => ({selectedItems: prevState.selectedItems.concat(name)}))
        }
    }



    render(){

      const ingredientsToRender = [];
      for (const [index, value] of this.ingredientList.entries()) {
          ingredientsToRender.push(
              <Ingredient
                name={value}
                key={index}
                isSelected={this.state.selectedItems.includes(value)}
                handleChange={this.handleChange} />
          )
      }

      return (
          <div className="grid-container">
              <div className="tabs"></div>
              <div className="main">{ingredientsToRender}</div>
              <SummaryCard className="SummaryCard" ingredientList={this.state.selectedItems}/>
          </div>
      );
    }


    snakeToPascal(str){
      str +='';
      str = str.split('_');
      for(var i=0;i<str.length;i++){
         str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
      }
      return str.join(' ');
    }

}

export default App;
