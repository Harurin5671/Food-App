import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
 import { getRecipes } from '../../actions';
import Pagination from '../Pagination/Pagination';
import style from './Home.module.css';
import Cards from '../Cards/Cards';
import Filter from '../Filter/Filter';
import NavBar from '../NavBar/NavBar';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [oder, setOrder] = useState("");
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

  return (
    <div>
      <nav className={style.navContainer}>
        <h1 className={style.navContainer__h1}>THE WIKIPEDIA OF RECIPES...</h1>
        <NavBar />
        <button className={style.navContainer__btnShow} onClick={(e) => handleClick(e)}>Show all Recipes</button>
      </nav>
        <Filter setCurrentPage={setCurrentPage} setOrder={setOrder} />
        <div className={style.pageContainer}>
          <Pagination
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          pagination={pagination}
          />
        </div>
          <Cards data={currentRecipes}/>
    </div>
  );
};
