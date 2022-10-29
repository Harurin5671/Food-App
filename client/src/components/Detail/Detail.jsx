import React from "react";
import { getDetail } from "../../actions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Detail(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
    // eslint-disable-next-line
  }, [dispatch]);
  const details = useSelector((state) => state.detail);
  const recipe = details[0];
  console.log(details);
  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      {details.length > 0 ? (
        <div>
          <h1>Recipe Name: {recipe.title}</h1>
          <h3>Health Score: {recipe.healthScore}</h3>
          <h3>
            Type of Diet:{" "}
            {recipe.createDb
              ? recipe.diets.map((d) => d.name).join(", ")
              : recipe.diets.map((d) => d).join(", ")}
          </h3>
          <h3>Summary: {recipe.summary.replace(/<[^>]*>?/g, "")}</h3>
          <img src={recipe.image} alt="img not found" />
          <h3>Instructions: </h3>
          {recipe.analyzedInstructions.length > 0 ? (
            <ul>
              {recipe.createdDb ? (
                <li>{recipe.analyzedInstructions}</li>
              ) : (
                recipe.analyzedInstructions[0].steps.map((p) => (
                  <li key={p.number}>{p.step}</li>
                ))
              )}
            </ul>
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
