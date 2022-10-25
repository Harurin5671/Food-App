import React from 'react';

export default function Card({title, image, diets}) {
  return (
    <div>
      <h3>{title}</h3>
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
