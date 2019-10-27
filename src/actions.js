// Action types
export const ADD_TO_SELECTED = 'ADD_TO_SELECTED';
export const REMOVE_FROM_SELECTED = 'REMOVE_FROM_SELECTED';

// Action creators
export function addToSelected(ingredient) {
  return { type: ADD_TO_SELECTED, ingredient };
}

export function removeFromSelected(ingredient) {
  return { type: REMOVE_FROM_SELECTED, ingredient };
}