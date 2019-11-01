import React from 'react';
import { connect } from 'react-redux';
import '../css/components/SelectedList.css';
import { CardContent, Card, ListItem } from '@material-ui/core';

/*
 * This is where the Names of Selected Ingredients are shown.
 */
class SelectedList extends React.Component {
    render() {
        const ingredientNames = this.props.selectedList;
        const ingredientNamesToRender = [];

        if (ingredientNames.length > 0) {
            for (const [index, ingredientName] of ingredientNames.entries()) {
                ingredientNamesToRender.push(
                    <ListItem key={index} className="SelectedListItem">{ingredientName}</ListItem>
                );
            }
        }

        return (
            <Card className="SelectedList">
                <CardContent>
                    <div className="SelectedListTitle">{ingredientNames.length} Selected</div>
                    {ingredientNamesToRender}
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedList: state
})

export default connect(mapStateToProps)(SelectedList);
