import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDiets, getRecipes } from '../../actions/actions';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Cards from '../Cards/Cards';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import { App, homeContainer, menuContainer, sortFilter, refreshBtn, createRecipe } from './Home.module.css'

function Home() {
  const appTopRef = useRef()
  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const [, setSort] = useState('') //este state sólo sirve para re-renderizar la pág cuando hacemos un sort

  //pagination
  const [actualPage, setActualPage] = useState(1)
  const recipesPerPage = 9
  const indexOfLastRecipe = actualPage * recipesPerPage //last recipe per page
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //1st recipe per page
  const actualRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  const [minPageNumber, setMinPageNumber] = useState(0) //este estado y el q está abajo es para hacer el paginado más tikito y que quede lindo, uso ambos para hacer un slice y renderizar sólo ese pedazo
  const [maxPageNumber, setMaxPageNumber] = useState(5)
  const pages = (pageNumber) => {
    setActualPage(pageNumber);
    if(pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber+4)
      setMaxPageNumber(maxPageNumber+4)
    } else if(pageNumber <= minPageNumber+1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber-4)
      setMaxPageNumber(maxPageNumber-4)
    }
  };

  const handleRefresh = () => {
    setActualPage(1)
    setMinPageNumber(0)
    setMaxPageNumber(5)  
    dispatch(getRecipes())
  }

  useEffect(() => {
    !recipes.length && dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch, recipes])

  return (
    <div ref={appTopRef} className={App}>
      <Nav setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} />
      <div className={homeContainer}>
        
        <div className={menuContainer}>
          <div className={sortFilter}>
            <Filter setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} />
            <Sort setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} setSort={setSort} />
          </div>
          <button className={refreshBtn} onClick={handleRefresh}>Refresh</button>
          
          <h3 className={createRecipe}>
            Submit your own recipe&nbsp;
            <Link to='/creation'>here</Link>!
          </h3>
          <Pagination actualPage={actualPage} minPageNumber={minPageNumber} maxPageNumber={maxPageNumber} recipes={recipes} recipesPerPage={recipesPerPage} pages={pages} />
        </div>
        
        <Cards actualRecipes={actualRecipes} />
      </div>
      <ScrollToTopButton appTopRef={appTopRef} />
    </div>
  );
}

export default Home;