import React from 'react';
import style from './Pagination.module.css';

export default function Pagination({recipesPerPage, allRecipes, pagination}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  };

  return (
    <div className={style.pagination}>
        {pageNumber &&
          pageNumber.map((n) => (
              <a className={style.a} onClick={() => pagination(n)} href="#!" key={n}>
                {n}
              </a>
          ))}
    </div>
  );
}
