import React from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';
import { nav, navContainer, title } from './Nav.module.css'

function Nav() {
  return (
    <nav className={nav}>
      <div className={navContainer}>
        <h1 className={title}>
          <Link to="/home">Food app</Link>
        </h1>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Nav;