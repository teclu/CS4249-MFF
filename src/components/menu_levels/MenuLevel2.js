import React from 'react';
import Ingredient from '../Ingredient.js';
import SelectedList from '../SelectedList.js';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

class MenuLevel2 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          category: "Vegetables",
          subcategory: false
      };
      this.handleChangeCategoryTab = this.handleChangeCategoryTab.bind(this);
      this.handleChangeSubcategoryTab = this.handleChangeSubcategoryTab.bind(this);
  }

  componenetDidMount() {

  }

  /*
   * Handles the change in Category and shows the correct Category content.
   */
  handleChangeCategoryTab(event, newCategory) {
      this.setState(state => {
          return {category: newCategory,
                  subcategory: false
           }
      });
  }

  /*
   * Handles the change in Subategory and shows the correct subcategory content.
   */
  handleChangeSubcategoryTab(event, newSubcategory) {
      this.setState(state => {
          return { subcategory: newSubcategory }
      });
  }


  render() {
      let categoryIndex = 0;
      let subcategoryIndex = 0;
      let ingredientIndex = 0;

      const categoryTabLabelsToRender = [];
      const componentsInCategoryToRender = [];
      // Create the Ingredient Components at the 1-Level
      for (const category in this.props.ingredients) {
        // First we create the Category Tab.
          categoryTabLabelsToRender.push(
              <Tab key={categoryIndex} value={category} index={category} label={category} />
          );

          const subcategoryTabLabelsToRender = [];
          const componentsInSubcategoryToRender = [];
          // We get all the subcategories under the Category
          for (const subcategory in this.props.ingredients[category]) {
            subcategoryTabLabelsToRender.push(
                <Tab key={subcategoryIndex} value={subcategory} index={subcategory} label={subcategory} />
            )

            const ingredientsToRender = [];
            // Then we get all the Ingredients under that Subategory.
              for (const ingredientName of this.props.ingredients[category][subcategory]) {
                  ingredientsToRender.push(
                      <Ingredient key={ingredientIndex} ingredientName={ingredientName} id={ingredientIndex} handleIngredientSelection={this.props.handleIngredientSelection.bind(this)} hidden={this.state.subcategory !== subcategory} />
                  )
                  ingredientIndex++;
              }

              componentsInSubcategoryToRender.push(
                  <div className="SubcategoryTab" key={subcategoryIndex} value={subcategory} index={subcategory} hidden={this.state.subcategory !== subcategory}>
                      <Grid container spacing={1}>
                          <div className="CategoryTitle">{subcategory}</div>
                          {ingredientsToRender}
                      </Grid>
                  </div>
              );

              subcategoryIndex++;
          }

          // Finally we add all Ingredients to the Category content; this only gets shown if we click the Category Tab.
          if(this.state.category === category){
            componentsInCategoryToRender.push(
                <div className="CategoryTab" key={categoryIndex} value={category} index={category} hidden={this.state.category !== category}>
                    <Grid container spacing={1}>
                        <Grid item xs ={3}>
                            <Tabs orientation="vertical" value={this.state.subcategory} onChange={this.handleChangeSubcategoryTab}>
                                {subcategoryTabLabelsToRender}
                            </Tabs>
                        </Grid>
                        <Grid item xs ={9}>
                            {componentsInSubcategoryToRender}
                        </Grid>
                    </Grid>
                </div>
            );
          }
          categoryIndex++;
      }

      return (
          <Box>
              <AppBar position="fixed">
                  <Tabs value={this.state.category} onChange={this.handleChangeCategoryTab}>
                      {categoryTabLabelsToRender}
                  </Tabs>
              </AppBar>
              <div className="AppBarOffset"></div>
              <Grid container spacing={1}>
                  <Grid item xs={10}>
                      {componentsInCategoryToRender}
                  </Grid>
                  <Grid item xs={2}>
                      <SelectedList selectedList={this.props.selectedList} />
                  </Grid>
              </Grid>
          </Box>
      );
  }
}

export default MenuLevel2;