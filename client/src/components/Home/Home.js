import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDiets, getRecipes } from '../../actions/actions';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
// import styles from './Home.module.css'

function Home() {
  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()

  useEffect(() => {
    !recipes.length && dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch, recipes.length])

  return (
    <div>
      <h1>Food app</h1>
      <SearchBar />
      <Filter />
      {recipes.length && Array.isArray(recipes)
        ? recipes.map(r => <Card key={r.id} id={r.id} image={r.image} name={r.name} diets={r.diets} createdInDB={r.createdInDB} />)
        : !recipes.length ? 'Loading...' : recipes}
    </div>
  );
}

export default Home;