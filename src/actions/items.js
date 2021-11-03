export const ITEMS_FETCH_DATA_SUCCESS = "ITEMS_FETCH_DATA_SUCCESS";
export const ITEMS_FETCH_DATA_ERROR = "ITEMS_FETCH_DATA_ERROR";
export const ITEMS_FETCH_DATA_LOADING = "ITEMS_FETCH_DATA_LOADING";

export function itemsFetchDataSuccess(items) {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    items,
  };
}

export function getLoadingItems() {
  return {
    type: ITEMS_FETCH_DATA_LOADING,
  };
}

export function getErrorLoadingItems() {
  return {
    type: ITEMS_FETCH_DATA_ERROR,
  };
}

export function itemsFetchData(url) {
  return (dispatch) => fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(getErrorLoadingItems()));
}
