import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import { Link } from "react-router-dom";

export default function Cards({ data }) {
  console.log(data);
  return (
    <div className={style.cards__div}>
      {data &&
        data.map((r) => (
          <div key={r.id}>
            <Link to={`/recipes/${r.id}`}>
              <Card
                title={r.title}
                image={r.image}
                id={r.id}
                diets={
                  r.createDb
                    ? r.diets.map((d) => d.name.toUpperCase()).join(", ")
                    : r.diets.map((d) => d.toUpperCase()).join(", ")
                }
              />
            </Link>
          </div>
        ))}
    </div>
  );
}
