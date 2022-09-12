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

    case 'SORT_BY_NAME':
      if (!Array.isArray(state.recipes)) return { ...state } //para q la app no se rompa al intentar ordenar el string not found
      const recipesSortedByName =
        action.payload === 'nameAtoZ' 
          ? state.recipes.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
          })
          : state.recipes.sort((a, b) => {
            if (a.name < b.name) return 1
            if (a.name > b.name) return -1
            return 0
          })
      return {
        ...state,
        recipes: recipesSortedByName
      };

    case 'SORT_BY_HEALTHSCORE':
      if (!Array.isArray(state.recipes)) return { ...state } //para q la app no se rompa al intentar ordenar el string not found
      const recipesSortedByHealthScore =
        action.payload === 'lessHealthy' 
          ? state.recipes.sort((a, b) => {
            if (a.healthScore > b.healthScore) return 1
            if (a.healthScore < b.healthScore) return -1
            return 0
          })
          : state.recipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return 1
            if (a.healthScore > b.healthScore) return -1
            return 0
          })
      return {
        ...state,
        recipes: recipesSortedByHealthScore
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
