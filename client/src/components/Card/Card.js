import React from 'react';
import { Link } from "react-router-dom";
import { img, card, body, title, healthS, diet } from './Card.module.css'

function Card ({ id, image, name, diets, healthScore, createdInDB }) {
  const color = () => {
    if (healthScore >= 66) return 'green'
    if (healthScore >= 33) return 'hsl(51, 100%, 46%)'
    else return 'crimson'
  }

  return (
    <Link className={card} to={`/home/${id}`}>
      <img className={img} src={image} alt={name} />
      <div className={body}>
        <h3 className={title}>{name}</h3>
        {healthScore && (
          <h4 className={healthS}>{healthScore}%&nbsp;
            <svg height={12} fill={color(healthScore)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
          </h4>
        )}
        {createdInDB
          ? <p className={diet}>{diets.map(d => Object.values(d)).join(', ')}</p>
          : <p className={diet}>{diets.join(', ')}</p>}
      </div>
    </Link>
  );
}

export default Card;