import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({title, image, diets, id}) {
  return (
    <div>
      <Link to={`/recipes/${id}`}>
        <h3>{title}</h3>
      </Link>
      <h5>{diets}</h5>
      <img
        src={image}
        alt="Img recipe not found"
        width="150px"
        height="150px"
      />
    </div>
  );
};
