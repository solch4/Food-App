import React from "react";
import { useSelector } from "react-redux";
import leftArrow from '../../assets/arrow-left.svg'
import rightArrow from '../../assets/arrow-right.svg'
import { pagination, active, disabled, arrow } from "./Pagination.module.css";

function Pagination({ recipesPerPage, pages }) {
  const { recipes, actualPage, minPageNumber, maxPageNumber } = useSelector(state => state)

  const arrPageNumbers = [];
  //pregunto si es un array para tener una sola pág cuando tenga el string de recipe not found
  const nOfPages = Math.ceil((Array.isArray(recipes) ? recipes.length : 1) / recipesPerPage);
  for (let i = 1; i <= nOfPages; i++) arrPageNumbers.push(i);

  //condicion para q no rompa al querer volver a una pag q no existe
  const handlePrev = () => (actualPage-1) && pages(actualPage - 1)
  //condicion para q no rompa al querer avanzar a una pag q no existe
  const handleNext = () => (actualPage!==arrPageNumbers.length) && pages(actualPage + 1)

  return (
    <div className={pagination}>
      {/* prev */}
      <button className={actualPage === 1 ? disabled : null} onClick={handlePrev}>
        <img className={arrow} src={leftArrow} alt='Prev' />
      </button>
      
      {/* page n */}
      {arrPageNumbers.slice(minPageNumber, maxPageNumber).map((n) => 
        <button className={actualPage === n ? active : null} onClick={() => pages(n)} key={n}>{n}</button>
      )}
      
      {/* next */}
      <button className={actualPage === arrPageNumbers.length ? disabled : null} onClick={handleNext}>
        <img className={arrow} src={rightArrow} alt='Next' />
      </button>
    </div>
  );
}

export default Pagination;