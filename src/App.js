import React from 'react';
import Ingredient from './components/Ingredient.js'
import SummaryCard from './components/SummaryCard.js'
import Card from './components/Card.js'
import './css/App.css';

class App extends React.Component {
    // For testing purposes. More changes to come.
    constructor() {
        super()
        this.state = {
            selectedItems: []
        }
        this.dataBase = {}

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.dataBase = require('./Ingredients.json');
        let ingredients = []



        this.setState(() => ({ ingredientList: ingredients }))

    }

    handleChange(name) {
        if (this.state.selectedItems.includes(name)) {
            this.setState(prevState => ({
                selectedItems: prevState.selectedItems.filter((x) => x !== name)
            }));
        }
        else {
            this.setState(prevState => ({ selectedItems: prevState.selectedItems.concat(name) }))
        }
    }



    render() {

        const toRender = [];
        let index = 0

        if (this.props.menuLevels === 1) {
            for (const tab in this.dataBase) {
                for (const category in this.dataBase[tab]) {
                    for (const subcategory in this.dataBase[tab][category]) {
                        for (const ingredient of this.dataBase[tab][category][subcategory]) {
                            const value = this.snakeToPascal(ingredient)
                            toRender.push(
                                <Ingredient
                                    name={value}
                                    key={index}
                                    isSelected={this.state.selectedItems.includes(value)}
                                    handleChange={this.handleChange} />
                            )
                            index++
                        }
                    }
                }
            }
        }
        else if (this.props.menuLevels === 2) {
            for (const tab in this.dataBase) {
                for (const category in this.dataBase[tab]) {
                    for (const subcategory in this.dataBase[tab][category]) {
                        const cardItems = []
                        const id = index
                        let stayOpen = false

                        for (const ingredient of this.dataBase[tab][category][subcategory]) {
                            const value = this.snakeToPascal(ingredient)
                            const isSelected = this.state.selectedItems.includes(value)
                            if (!stayOpen && isSelected) stayOpen = true
                            cardItems.push(
                                <Ingredient
                                    name={value}
                                    key={index}
                                    isSelected={this.state.selectedItems.includes(value)}
                                    handleChange={this.handleChange} />
                            )
                            index++
                        }
                        const value = this.snakeToPascal(subcategory)
                        toRender.push(
                            <Card
                                subcategory={value}
                                items={cardItems}
                                key={id}
                                isSelected={this.state.selectedItems.includes(value)}
                                stayOpen={stayOpen}
                                handleChange={this.handleChange}
                            />
                        )
                        index++
                    }
                }
            }
        }

        return (
            <div className="grid-container">
                <div className="tabs"></div>
                <div className="main">{toRender}</div>
                <SummaryCard className="right-pane" ingredientList={this.state.selectedItems} />
            </div>
        );
    }


    snakeToPascal(str) {
        str += '';
        str = str.split('_');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].slice(0, 1).toUpperCase() + str[i].slice(1, str[i].length);
        }
        return str.join(' ');
    }

}

export default App;
