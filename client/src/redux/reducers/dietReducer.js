const initialState = {
  diets: [],
};

function dietReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    default:
      return { ...state };
  }
}

export default dietReducer;
