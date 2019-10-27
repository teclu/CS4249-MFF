import { 
  ADD_TO_SELECTED,
  REMOVE_FROM_SELECTED,
} from './actions';

const selectList = (state = [], action) => {
  // Treat states as immutable
  switch (action.type) {
    case ADD_TO_SELECTED: 
      return state.concat([action.ingredient]);
    case REMOVE_FROM_SELECTED:
      let newState = state.slice();
      newState.splice(newState.indexOf(action.ingredient), 1);
      return newState;
    default:
      return state
  }
}

export default selectList;