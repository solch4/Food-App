import React from 'react';
import { useDispatch } from 'react-redux';
import { sortByHealthScore, sortByName } from '../../actions/actions';
// import styles from './Sort.module.css'

function Sort({ setActualPage, setSort }) {
  const dispatch = useDispatch()
  const handleSort = (e) => {
    setSort(e.target.value)
    setActualPage(1)
    if (e.target.value === 'nameAtoZ' || e.target.value === 'nameZtoA') dispatch(sortByName(e.target.value))
    if (e.target.value === 'moreHealthy' || e.target.value === 'lessHealthy') dispatch(sortByHealthScore(e.target.value))
  }

  return (
    <div>
      <select onChange={handleSort} defaultValue='DEFAULT'>
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