import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import selectList from './reducers';
import MenuLevel0 from './components/menu_levels/MenuLevel0.js';
import MenuLevel1 from './components/menu_levels/MenuLevel1.js';
import MenuLevel2 from './components/menu_levels/MenuLevel2.js';
import SpecifiedIngredientsTask from './components/SpecifiedIngredientsTask.js';
import './css/App.css';
import Ingredients from './Ingredients.js';

const store = createStore(selectList);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.ingredients = Ingredients; // Import the Ingredients JSON File.
    }

    render() {
      window.addEventListener("keydown",function (e) {
          if (e.keyCode === 116 || e.keyCode === 114 || (e.ctrlKey && (e.keyCode === 70|| e.keycode===82))) {
              e.preventDefault();
          }
      })
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path="/MenuLevel0" render={(props) => <MenuLevel0 {...props} store={store} ingredients={this.ingredients} />} />
                    <Route path="/MenuLevel2" render={(props) => <MenuLevel2 {...props} store={store} ingredients={this.ingredients} />} />
                    <Route path="/MenuLevel1" render={(props) => <MenuLevel1 {...props} store={store} ingredients={this.ingredients} />} />
                    <Route path="/InstructionTask" render={(props => <SpecifiedIngredientsTask {...props} />)} />
                </Switch>
            </Router>
        );
    }
}

export default App;
