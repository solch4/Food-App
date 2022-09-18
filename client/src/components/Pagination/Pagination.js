import React from "react";
import "./Pagination.module.css";

function Pagination({ actualPage, minPageNumber, maxPageNumber, recipes, recipesPerPage, pages }) {
  const arrPageNumbers = [];
  //pregunto si es un array para tener una sola pág cuando tenga el string de recipe not found
  const nOfPages = Math.ceil((Array.isArray(recipes) ? recipes.length : 1) / recipesPerPage);
  for (let i = 1; i <= nOfPages; i++) arrPageNumbers.push(i);

  const handlePrev = () => (actualPage-1) && pages(actualPage - 1)
  const handleNext = () => (actualPage!==arrPageNumbers.length) && pages(actualPage + 1)

  return (
    <ul>
      <li onClick={handlePrev}>«</li>
      {arrPageNumbers.slice(minPageNumber, maxPageNumber).map((n) => 
        <li onClick={() => pages(n)} key={n}>{n}</li>
      )}
      <li onClick={handleNext}>»</li>
    </ul>
  );
}

export default Pagination;