import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet } from '../../actions/actions';
// import styles from './Filter.module.css'

function Filter({ setActualPage }) {
  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)

  const handleFilterByDiet = (e) => {
    setActualPage(1)
    dispatch(filterByDiet(e.target.value))
  }

  return (
    <div>
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