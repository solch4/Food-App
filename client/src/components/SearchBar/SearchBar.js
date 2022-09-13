import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../actions/actions';
// import styles from './SearchBar.module.css'

function SearchBar({ setActualPage }) {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    setActualPage(1)
    dispatch(searchByName(searchInput))
    setSearchInput('')
  }

  const handleChange = (e) => setSearchInput(e.target.value)

  return (
    <form>
      <input value={searchInput} onChange={handleChange} type='search' placeholder='Search recipe...' />
      <button onClick={handleSearch} type='submit' >Search</button>
    </form>
  );
}

export default SearchBar;