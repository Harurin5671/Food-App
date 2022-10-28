import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({title, image, diets, id}) {
  return (
    <div className={style.card_container}>
      <Link to={`/recipes/${id}`}>
        <h3 className={style.title}>{title}</h3>
      </Link>
      <h5>{diets}</h5>
      <img
        src={image}
        alt="Img recipe not found"
      />
    </div>
  );
};
