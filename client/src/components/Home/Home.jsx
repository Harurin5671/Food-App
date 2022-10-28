import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterCreated, orderByName, orderByScore, filterByDiet } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import img from '../../image/fondo-comida-saludable-dibujado-mano_23-2148149083.jpg';
import SearchBar from '../SearchBar/SearchBar';
import style from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  // eslint-disable-next-line
  const [orderName, setOrderName] = useState("");
  // eslint-disable-next-line
  const [score, setScore] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstReecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstReecipe,
    indexOfLastRecipe
  );
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  };

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName(e.target.value);
  };

  function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setScore(e.target.value);
  };

  function handleSelectByDiet(e){
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }

  return (
    <div className={style.container}>
      <h1 className={style.h1}>THE WIKIPEDIA OF RECIPES...</h1>
      <div className={style.nav}>
        <Link className={style.link} to="/create">
          <button className={style.btn_create}><span>Create Recipe</span></button>
        </Link>
      </div>
      <SearchBar />
      <button onClick={(e) => handleClick(e)}>Show all Recipes</button>
      <div>
        <span>Filter by Type of diet</span>
        <select className={style.select_diet} onChange={(e) => handleSelectByDiet(e)}>
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
          <option value="Vegetarian">Vegetarian</option>
        </select>
        <span>Order by Recipe Name</span>
        <select onChange={(e) => handleSort(e)}>
          <option value="all">All</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <span>Order by Score</span>
        <select onChange={(e) => handleSelectByScore(e)}>
          <option value="all">All</option>
          <option value="asc">Highest Score</option>
          <option value="desc">Lowest Score</option>
        </select>
        <span>Filter for Creation</span>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="create">Create</option>
          <option value="api">Api</option>
        </select>
        <div className={style.pageContainer}>
          <Pagination
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            pagination={pagination}
          />
        </div>
        <div className={style.card_container}>
        {currentRecipes &&
          currentRecipes.map((r) => {
            return (
              <div key={r.id}>
                <Card
                  title={r.title}
                  diets={
                    r.createDb
                      ? r.diets.map((d) => <p key={d.name}>{d.name}</p>)
                      : r.diets.map((d) => <p key={d}>{d}</p>)
                  }
                  image={r.image ? r.image : img}
                  id={r.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
