const initialState = {
  actualPage: 1,
  minPageNumber: 0,
  maxPageNumber: 5,
};

function paginationReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ACTUAL_PAGE":
      return {
        ...state,
        actualPage: action.payload,
      };

    case "SET_MIN_PAGE_NUMBER":
      return {
        ...state,
        minPageNumber: action.payload,
      };

    case "SET_MAX_PAGE_NUMBER":
      return {
        ...state,
        maxPageNumber: action.payload,
      };

    default:
      return { ...state };
  }
}

export default paginationReducer;
