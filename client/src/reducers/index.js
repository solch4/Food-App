const initialState = {
  recipes: [], //renderizo este state
  allRecipes: [], // este state es solo para aplicar los filtros, es una copia de recipes
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case 'GET_DIETS': 
      return {
        ...state,
        diets: action.payload
      };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };

    case "FILTER_BY_DIET":
      const filteredRecipes = state.allRecipes.filter(recipe => recipe.diets.includes(action.payload))
      return {
        ...state,
        recipes: filteredRecipes
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
