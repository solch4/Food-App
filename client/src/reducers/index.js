const initialState = {
  recipes: [], //renderizo este state
  allRecipes: [], // este state es solo para aplicar los filtros, es una copia de recipes
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case 'SEARCH_BY_NAME': 
    return {
      ...state,
      recipes: action.payload
    }
    default:
      return { ...state };
  }
}

export default rootReducer;
