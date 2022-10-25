import React from 'react';

export default function Pagination({recipesPerPage, allRecipes, pagination}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  };

  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((n) => (
            <li key={n}>
              <a onClick={() => pagination(n)} href="#!">
                {n}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
