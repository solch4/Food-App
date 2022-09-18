import React from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import { nav, navContainer, title } from './Nav.module.css'

function Nav({ setMinPageNumber, setMaxPageNumber,setActualPage }) {
  return (
    <nav className={nav}>
      <div className={navContainer}>
        <h1 className={title}>
          <Link to="/home">Food app</Link>
        </h1>
        <SearchBar setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} />
      </div>
    </nav>
  );
}

export default Nav;