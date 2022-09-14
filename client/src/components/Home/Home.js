import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDiets, getRecipes } from '../../actions/actions';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
// import styles from './Home.module.css'

function Home() {
  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const [, setSort] = useState('')

  //pagination
  const [actualPage, setActualPage] = useState(1)
  const recipesPerPage = 9
  const indexOfLastRecipe = actualPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const actualRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  const pages = (n) => setActualPage(n)

  useEffect(() => {
    !recipes.length && dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch, recipes])

  return (
    <div>
      <h1>Food app</h1>
      <SearchBar setActualPage={setActualPage} />
      <Filter setActualPage={setActualPage} />
      <Sort setActualPage={setActualPage} setSort={setSort} />
      <Pagination actualPage={actualPage} recipes={recipes} recipesPerPage={recipesPerPage} pages={pages} />
      <Link to='/creation'><h3>Create recipe</h3></Link>
      {actualRecipes.length && Array.isArray(actualRecipes)
        ? actualRecipes.map(r => <Card key={r.id} id={r.id} image={r.image} name={r.name} diets={r.diets} healthScore={r.healthScore} createdInDB={r.createdInDB} />)
        : !recipes.length ? 'Loading...' : recipes}
    </div>
  );
}

export default Home;