import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import '../css/components/SelectedList.css';

/*
 * This is where the Names of Selected Ingredients are shown.
 */
class SelectedList extends React.Component {
    render() {
        console.log(this.props.store.getState())
        const ingredientNames = this.props.selectedList;
        const ingredientNamesToRender = [];

        if (ingredientNames.length > 0) {
            for (const [index, ingredientName] of ingredientNames.entries()) {
                ingredientNamesToRender.push(
                    <ListItem key={index} className="SelectedListItem">&bull; {ingredientName}</ListItem>
                );
            }
        }
        else {
            ingredientNamesToRender.push(
                <ListItem key={0} className="SelectedListItem">None Selected.</ListItem>
            );
        }

        return (
            <Card className="SelectedList">
                <div className="SelectedListTitle">Selected ({ingredientNames.length}):</div>
                {ingredientNamesToRender}
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedList: state
})

export default connect(mapStateToProps)(SelectedList);
