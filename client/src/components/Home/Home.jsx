import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterCreated } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import img from '../../image/fondo-comida-saludable-dibujado-mano_23-2148149083.jpg';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstReecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstReecipe, indexOfLastRecipe);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getRecipes());
  } ,[dispatch]);

  function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
  };

  function handleFilterCreated(e){
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <Link to="/recipes">
        <button>Crear Personaje</button>
      </Link>
      <h1>THE WIKIPEDIA OF RECIPES...</h1>
      <button onClick={(e) => handleClick(e)}>Show all Recipes</button>
      <div>
        <span>Filter by Type of diet</span>
        <select>
          <option value="all">All</option>
        </select>
        <span>Order by Recipe Name</span>
        <select>
          <option value="all">All</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <span>Order by Score</span>
        <select>
          <option value="all">All</option>
          <option value="asc">Highest Score</option>
          <option value="desc">Lowest Score</option>
        </select>
        <span>Filter for Creation</span>
        <select onChange={e => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="create">Create</option>
          <option value="api">Api</option>
        </select>
        <Pagination
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          pagination={pagination}
        />
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
                  image={
                    r.image ? r.image : img
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
