import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActualPage, setMaxPageNumber, setMinPageNumber, setSortSelectValue, sortByHealthScore, sortByName } from '../../redux/actions/actions';
import { sortContainer, title } from './Sort.module.css'

function Sort({ setSort }) {
  const dispatch = useDispatch()
  const { sortSelectValue } = useSelector(state => state.ux)
  
  const handleSort = (e) => {
    dispatch(setSortSelectValue(e.target.value))
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    setSort(e.target.value)
    if (e.target.value === 'nameAtoZ' || e.target.value === 'nameZtoA') dispatch(sortByName(e.target.value))
    if (e.target.value === 'moreHealthy' || e.target.value === 'lessHealthy') dispatch(sortByHealthScore(e.target.value))
  }

  return (
    <div className={sortContainer}>
      <span className={title}>Sort by </span>
      <select onChange={handleSort} value={sortSelectValue}>
        <option value='DEFAULT' disabled>--select sort--</option>
        <option value='nameAtoZ'>Name (A-Z)</option>
        <option value='nameZtoA'>Name (Z-A)</option>
        <option value='moreHealthy'>More healthy</option>
        <option value='lessHealthy'>Less healthy</option>
      </select>
    </div>
  );
}

export default Sort;