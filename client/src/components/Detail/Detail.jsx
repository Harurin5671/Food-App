// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getDetail } from '../../actions';
// import { Link } from 'react-router-dom';

// export default function Detail(props) {
//   const dispatch = useD
//   console.log(props);
//   return (
//     <div>
//       <Link to="/home">
//         <button>Back to Home</button>
//       </Link>
//     </div>
//   );
// };


import React from "react";
import { getDetail } from "../../actions";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Detail(props) {
  let {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
    // eslint-disable-next-line
  }, []);
  const details = useSelector(state => state.detail);
  return (
    <div>
      <Link to="/home">
      <button>Back to Home</button>
      </Link>
      {details.length > 0 ? (
        <div>
          <h1>Name of Recipe: {details[0].title}</h1>
          <p>Health Score: {details[0].healthScore}</p>
          {details[0].createdDb ? (
            <h3>
              Type od Diets: {details[0].diets.map((d) => d.name).join(", ")}
            </h3>
          ) : (
            <h3>Type od Diets: {details[0].diets.map((d) => d).join(", ")}</h3>
          )}
          <h3>Summary:</h3>
          <p>{details[0].summary.replace(/<[^>]*>?/g, "")}</p>
          <img src={details[0].image} alt="img not found" />
          {details[0].analyzedInstructions ? (
            <h3>Step by step instructions: </h3>
          ) : (
            <h3>Step by step instructions: - </h3>
          )}
          {details[0].analyzedInstructions.length > 0 ? (
            <ul>
              {details[0].createdDb ? (
                <li>{details[0].analyzedInstructions}</li>
              ) : (
                details[0].analyzedInstructions[0].steps.map((p) => (
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
