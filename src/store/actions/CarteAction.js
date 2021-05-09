import * as actionTypes from "./actionTypes";

const setItems = (item) => {
  return {
    type: actionTypes.ADD_ITEMS_TOCART,
    item: item,
  };
};

const removeItems = (id) => {
  return {
    type: actionTypes.Remove_ITEM_FROMCART,
    id: id,
  };
};

export const onAddItems = (item) => {
  return (dispatch) => {
    return dispatch(setItems(item));
  };
};

export const onRemoveItems = (id) => {
  return (dispatch) => {
    return dispatch(removeItems(id));
  };
};
