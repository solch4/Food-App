const initialState = {
  scrollY: window.scrollY,

  //select values home
  filterSelectValue: "DEFAULT",
  sortSelectValue: "DEFAULT",
};

function uxReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_SCROLL_Y":
      return {
        ...state,
        scrollY: action.payload,
      };

    //select values home
    case "SET_FILTER_SELECT_VALUE":
      return {
        ...state,
        filterSelectValue: action.payload,
      };

    case "SET_SORT_SELECT_VALUE":
      return {
        ...state,
        sortSelectValue: action.payload,
      };

    default:
      return { ...state };
  }
}

export default uxReducer;
