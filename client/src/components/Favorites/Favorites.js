import React from "react";
import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'
import { container } from './Favorites.module.css'

function Favorites() {
  const storage = JSON.parse(localStorage.getItem("favorites"));

  return (
    <>
      <Nav />
      {storage ? (
        <div className={container}>
          {storage.map(fav => (
            <Card key={fav.id} id={fav.id} image={fav.image} name={fav.name} diets={fav.diets} healthScore={fav.healthScore} createdInDB={fav.createdInDB} />
          ))}
        </div>
      ) : (
        <h3>No recipes added to favorites</h3>
      )}
      <ScrollToTopButton />
    </>
  );
}

export default Favorites;
