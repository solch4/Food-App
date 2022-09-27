import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName, setActualPage, setMaxPageNumber, setMinPageNumber } from '../../actions/actions';
import { searchBar, input, btn } from './SearchBar.module.css'

function SearchBar() {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    
    dispatch(searchByName(searchInput.trim()))
    
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    setSearchInput('')
  }

  const handleChange = (e) => setSearchInput(e.target.value)

  return (
    <form className={searchBar}>
      <input className={input} value={searchInput} onChange={handleChange} type='search' placeholder='Search recipe...' />
      <button className={btn} onClick={handleSearch} type='submit' aria-label="search"></button>
    </form>
  );
}

export default SearchBar;