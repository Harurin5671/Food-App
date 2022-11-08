import React from "react";
import { useDispatch } from "react-redux";
import {
  filterCreated,
  orderByName,
  orderByScore,
  filterByDiet,
} from "../../actions";
import style from "./Filter.module.css";

export default function Filter({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    // setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSelectByDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={style.container}>
      <div className={style.diet}>
        <span>Filter by Type of diet</span>
        <select onChange={(e) => handleSelectByDiet(e)}>
          <option value="all">All</option>
          <option value="vegan">Vegan</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="dairy free">Dairy Free</option>
          <option value="gluten free">Gluten Free</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
          <option value="pescatarian">Pescatarian 30</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="fodmap friendly">Fodmap Friendly</option>
        </select>
      </div>
      <div className={style.name}>
        <span>Order by Recipe Name</span>
        <select onChange={(e) => handleSort(e)}>
          <option value="all">All</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
      <div className={style.score}>
        <span>Order by Score</span>
        <select onChange={(e) => handleSelectByScore(e)}>
          <option value="all">All</option>
          <option value="asc">Highest Score</option>
          <option value="desc">Lowest Score</option>
        </select>
      </div>
      <div className={style.created}>
        <span>Filter for Creation</span>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="create">Create</option>
          <option value="api">Api</option>
        </select>
      </div>
    </div>
  );
}
