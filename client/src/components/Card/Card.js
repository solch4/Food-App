import React from 'react';
import { useNavigate } from "react-router-dom";
import { card, cardBody } from './Card.module.css'

function Card ({ id, image, name, diets, createdInDB }) {
  const navigate = useNavigate();
  const goToDetail = () => navigate(`/home/${id}`);

  return (
    <div className={card} onClick={goToDetail}>
      <img src={image} alt={name} />
      <div className={cardBody}>
        <h3>{name}</h3>
        {createdInDB
          ? <p>{diets.map(d => Object.values(d).map(d => d[0].toUpperCase() + d.slice(1))).join(', ')}.</p>
          : <p>{diets.map(d => d[0].toUpperCase() + d.slice(1)).join(', ')}.</p>}
      </div>
    </div>
  );
}

export default Card;