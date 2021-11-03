import {
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_FETCH_DATA_ERROR,
  ITEMS_FETCH_DATA_LOADING,
} from "../actions/items";

const initialState = {
  items: [],
  isLoading: false,
  isErrorloading: false,
};

// eslint-disable-next-line require-jsdoc
export function items(state = initialState, action) {
  switch (action.type) {
    case ITEMS_FETCH_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        isErrorloading: false,
      };
    case ITEMS_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.items,
        isLoading: false,
        isErrorloading: false,
      };
    case ITEMS_FETCH_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isErrorloading: true,
      };

    default:
      return state;
  }
}
