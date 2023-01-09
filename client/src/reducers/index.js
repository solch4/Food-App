import { combineReducers } from "redux";
import dietReducer from "./dietReducer";
import paginationReducer from "./paginationReducer";
import recipesReducer from "./recipesReducer";
import uxReducer from "./uxReducer";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  diets: dietReducer,
  pagination: paginationReducer,
  ux: uxReducer,
});

export default rootReducer;
