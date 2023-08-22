import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/actions/actions";

export const useRecipes = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.recipes);

  useEffect(() => {
    // si el estado allRecipes está vacío lo lleno, sino no
    !state.allRecipes.length && dispatch(getRecipes());
  }, [dispatch, state.allRecipes.length]);

  return state;
};
