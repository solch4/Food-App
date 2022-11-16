const initialState = {
  //renderizo siempre recipes, pueden estar filtradas u ordenadas
  recipes: [], 
  // allRecipes es para aplicar los filtros, contiene el 100% de recipes existentes
  allRecipes: [], 
  diets: [],
  detail: [],

  scrollY: window.scrollY,

  //pagination states
  actualPage: 1,
  minPageNumber: 0,
  maxPageNumber: 5,

  //select values home
  filterSelectValue: 'DEFAULT',
  sortSelectValue: 'DEFAULT'
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

    case "SEARCH_BY_HS":
      return {
        ...state,
        recipes: action.payload,
      };

    case "FILTER_BY_DIET":
      const filteredRecipes = action.payload === 'all' ? state.allRecipes : state.allRecipes.filter(recipe => recipe.diets.includes(action.payload))
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
      return {
        ...state
      };

    case 'DELETE_RECIPE':
      return {
        ...state
      };
    
    case 'EDIT_RECIPE':
      return {
        ...state
      };

    case 'SAVE_SCROLL_Y':
      return {
        ...state,
        scrollY: action.payload
      };
    
    //pagination

    case 'SET_ACTUAL_PAGE':
      return {
        ...state,
        actualPage: action.payload
      };
    
    case 'SET_MIN_PAGE_NUMBER':
      return {
        ...state,
        minPageNumber: action.payload
      };

    case 'SET_MAX_PAGE_NUMBER':
      return {
        ...state,
        maxPageNumber: action.payload
      };
    
    //select values home

    case 'SET_FILTER_SELECT_VALUE':
      return {
        ...state,
        filterSelectValue: action.payload
      };
    
    case 'SET_SORT_SELECT_VALUE':
      return {
        ...state,
        sortSelectValue: action.payload
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
