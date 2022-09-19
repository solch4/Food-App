import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet } from '../../actions/actions';
import { filterContainer, title } from './Filter.module.css'

function Filter({ setMinPageNumber, setMaxPageNumber, setActualPage }) {
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)

  const handleFilterByDiet = (e) => {
    setActualPage(1)
    setMinPageNumber(0)
    setMaxPageNumber(5)
    dispatch(filterByDiet(e.target.value))
  }

  return (
    <div className={filterContainer}>
      <span className={title}>Filter by </span>
      <select onChange={handleFilterByDiet} defaultValue='DEFAULT'>
        <option value='DEFAULT' disabled>--select diet--</option>
        {diets.length && diets.map(diet => 
          <option value={diet.name} key={diet.id}>{diet.name}</option>
        )}
      </select>
    </div>
  );
}

export default Filter;