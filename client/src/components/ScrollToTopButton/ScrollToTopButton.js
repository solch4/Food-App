import React from 'react';
import { scrollBtn } from './ScrollToTopButton.module.css'

function ScrollToTopButton({ appTopRef }) {
  const handleClick = () =>appTopRef.current?.scrollIntoView({ behavior: 'smooth' })
  
  return (
    <button className={scrollBtn} onClick={handleClick}></button>
  );
}

export default ScrollToTopButton;