import React from 'react';
import { Link } from "react-router-dom";
import { img, card, body, title, healthS, diet } from './Card.module.css'

function Card ({ id, image, name, diets, healthScore, createdInDB }) {
  return (
    <Link className={card} to={`/home/${id}`}>
      <img className={img} src={image} alt={name} />
      <div className={body}>
        <h3 className={title}>{name}</h3>
        {healthScore && <h4 className={healthS}>{healthScore}%</h4>}
        {createdInDB
          ? <p className={diet}>{diets.map(d => Object.values(d)).join(', ')}</p>
          : <p className={diet}>{diets.join(', ')}</p>}
      </div>
    </Link>
  );
}

export default Card;