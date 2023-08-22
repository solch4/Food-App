import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../redux/actions/actions";

export const useDiets = () => {
  const dispatch = useDispatch();
  const { diets } = useSelector((state) => state.diets);

  useEffect(() => {
    // si el estado diets está vacío lo lleno, sino no
    !diets.length && dispatch(getDiets());
  }, [dispatch, diets]);

  return { diets };
};
