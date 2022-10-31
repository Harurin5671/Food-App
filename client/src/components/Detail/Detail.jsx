import React from "react";
import { getDetail } from "../../actions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import style from "./Detail.module.css";
import img from "../../image/icons8-home-page-50.png";

export default function Detail(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
    // eslint-disable-next-line
  }, []);
  const details = useSelector((state) => state.detail);
  const recipe = details[0];
  console.log(details);
  return (
    <div className={style.container}>
      {details.length > 0 ? (
        <div className={style.detail_container}>
          <div className={style.detail_home}>
            <Link to="/home">
              <img
                className={style.detail_home_img}
                src={img}
                alt="img not found"
              />
            </Link>
            <p className={style.detail_home_p}>Home</p>
          </div>
          <h1 className={style.detail_title}>{recipe.title}</h1>
          <h3>Health Score: {recipe.healthScore}</h3>
          <h3 className={style.diet_score}>Type of Diet:</h3>
          <p className={style.detail_p_diets}>
            {recipe.createDb
              ? recipe.diets.map((d) => d.name.toUpperCase()).join(", ")
              : recipe.diets.map((d) => d.toUpperCase()).join(", ")}
          </p>
          <h3>Summary:</h3>
          <p className={style.detail_summary}>
            {recipe.summary.replace(/<[^>]*>?/g, "")}
          </p>
          <h3>Instructions: </h3>
          {recipe.analyzedInstructions.length > 0 ? (
            <ul className={style.detail_list}>
              {recipe.createDb ? (
                <li>{recipe.analyzedInstructions}</li>
              ) : (
                recipe.analyzedInstructions[0].steps.map((p) => (
                  <li key={p.number}>{p.step}</li>
                ))
              )}
            </ul>
          ) : (
            <p className={style.detail_p}>This recipe has no instructions</p>
          )}
          <img
            className={style.detail_img}
            src={recipe.image}
            alt="img not found"
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
