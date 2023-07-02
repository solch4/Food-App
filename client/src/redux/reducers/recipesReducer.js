const initialState = {
  //renderizo siempre recipes, pueden estar filtradas u ordenadas
  recipes: [],
  // allRecipes es para aplicar los filtros, contiene el 100% de recipes existentes
  allRecipes: [],
  favorites: localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites'))
    : [],
  detail: [],
  loading: false,
  error: '',
};

function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_RECIPES":
      return {
        ...state,
        recipes: [],
        loading: true,
      };

    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        loading: false,
        error: false,
      };

    case "SEARCH_BY_NAME_SUCCESS":
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        error: false,
      };
    
    case "SEARCH_BY_NAME_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SEARCH_BY_HS_SUCCESS":
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        error: false,
      };

    case "SEARCH_BY_HS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
    case "FILTER_BY_DIET":
      const filteredRecipes = action.payload === 'all' ? state.allRecipes : state.allRecipes.filter(recipe => recipe.diets.includes(action.payload))
      return {
        ...state,
        recipes: filteredRecipes,
        error: '',
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

    case 'GET_DETAIL':
      return {
        ...state,
        detail: action.payload
      };
    
    case 'CLEAR_DETAIL':
      return {
        ...state,
        detail: []
      };

    case 'CREATE_RECIPE':
      const allRecipes = [...state.allRecipes, action.payload]
      return {
        ...state,
        allRecipes: allRecipes,
        recipes: allRecipes,
        error: false,
      };

    case 'DELETE_RECIPE':
      const recipesFiltered = state.allRecipes.filter(r => r.id !== action.payload)
      return {
        ...state,
        allRecipes: recipesFiltered,
        recipes: recipesFiltered,
      };
    
    case 'EDIT_RECIPE':
      const allRecipesCopy = state.allRecipes
      const index = allRecipesCopy.findIndex(r => r.id === action.payload.id)
      allRecipesCopy.splice(index, 1, action.payload)
      return {
        ...state,
        allRecipes: allRecipesCopy,
        recipes: allRecipesCopy,
      };
  
    case "ADD_FAVORITE_RECIPE":
      const newFavorites = [...state.favorites, action.payload]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return {
        ...state,
        favorites: newFavorites
      };
    
    case "DELETE_FAVORITE_RECIPE":
      const favoritesFiltered = state.favorites.filter(recipe => recipe.id !== action.payload.id)
      localStorage.setItem('favorites', JSON.stringify(favoritesFiltered))
      return {
        ...state,
        favorites: favoritesFiltered
      };
    
    default:
      return { ...state };
  }
}

export default recipesReducer
