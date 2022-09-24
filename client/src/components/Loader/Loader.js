import React from 'react';
import { img } from './Loader.module.css'
import timer from '../../assets/timer.svg'

function Loader() {
  return (
    <img className={img} src={timer} alt='Loading...' />
  );
}

export default Loader;