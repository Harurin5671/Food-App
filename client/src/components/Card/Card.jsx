import React from "react";
import style from "./Card.module.css";

export default function Card({ title, image, diets, id }) {
  return (
    <div key={id} className={style.cardsContainer}>
      <h3 className={style.title}>{title}</h3>
      <h5 className={style.card_diet}>{diets}</h5>
      <img className={style.img_card} src={image} alt="Img recipe not found" />
    </div>
  );
}
