import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActualPage, setMaxPageNumber, setMinPageNumber, setSortSelectValue, sortByHealthScore, sortByName } from '../../redux/actions/actions';
import { sortContainer, title } from './Sort.module.css'

function Sort({ setSort }) {
  const dispatch = useDispatch()
  const { sortSelectValue } = useSelector(state => state.ux)
  
  const handleSort = (e) => {
    const { value } = e.target;
    dispatch(setSortSelectValue(value))
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(4))
    setSort(value)
    if (value === 'nameAtoZ' || value === 'nameZtoA') dispatch(sortByName(value))
    if (value === 'moreHealthy' || value === 'lessHealthy') dispatch(sortByHealthScore(value))
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