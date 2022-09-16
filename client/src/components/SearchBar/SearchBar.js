import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../actions/actions';
import { searchBar, input, btn } from './SearchBar.module.css'

function SearchBar({ setActualPage }) {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) alert('Please write the name of the recipe you want to find')
    setActualPage(1)
    dispatch(searchByName(searchInput))
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