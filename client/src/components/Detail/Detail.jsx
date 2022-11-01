import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import style from "./Detail.module.css";
import img from "../../image/icons8-home-page-50.png";
import axios from "axios";

export default function Detail(props) {
  const [detail, setDetail] = useState(null);

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`/recipes/${id}`).then((response) => {
      setDetail(response.data);
    });
    return () => {
      setDetail(null);
    };
    // eslint-disable-next-line
  }, []);
  console.log(detail);

  return (
    <div className={style.container}>
      {detail ? (
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
          <h1 className={style.detail_title}>{detail[0].title}</h1>
          <h3>Health Score: {detail[0].healthScore}</h3>
          <h3 className={style.diet_score}>Type of Diet:</h3>
          <p className={style.detail_p_diets}>
            {detail[0].createDb
              ? detail[0].diets.map((d) => d.name.toUpperCase()).join(", ")
              : detail[0].diets.map((d) => d.toUpperCase()).join(", ")}
          </p>
          <h3>Summary:</h3>
          <p className={style.detail_summary}>
            {detail[0].summary.replace(/<[^>]*>?/g, "")}
          </p>
          <h3>Instructions: </h3>
          {detail[0].analyzedInstructions.length > 0 ? (
            <ul className={style.detail_list}>
              {detail[0].createDb ? (
                <li>{detail[0].analyzedInstructions}</li>
              ) : (
                detail[0].analyzedInstructions[0].steps.map((p) => (
                  <li key={p.number}>{p.step}</li>
                ))
              )}
            </ul>
          ) : (
            <p className={style.detail_p}>This recipe has no instructions</p>
          )}
          <img
            className={style.detail_img}
            src={detail[0].image}
            alt="img not found"
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
