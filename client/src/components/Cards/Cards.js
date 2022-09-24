import React from "react";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Search404 from "../Search404/Search404";
import { cardContainer } from "./Cards.module.css";

function Cards({ actualRecipes }) {
  return (
    <div className={cardContainer}>
      {actualRecipes.length && Array.isArray(actualRecipes) ? (
        actualRecipes.map((r) => (
          <Card key={r.id} id={r.id} image={r.image} name={r.name}  diets={r.diets} healthScore={r.healthScore} createdInDB={r.createdInDB} />
        ))
      ) : (
        !actualRecipes.length 
        ? <Loader />
        : <Search404 />
      )}
    </div>
  );
}

export default Cards;
