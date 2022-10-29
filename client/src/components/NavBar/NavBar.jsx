import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css';
import img from '../../image/icons8-plus-80.png';

export default function NavBar() {
  return (
    <div className={style.navContainer__navbar}>
      <SearchBar />
      <Link to="/create">
        <img className={style.img} src={img} alt="" />
      </Link>
      <p className={style.p}>Create a Recipe</p>
    </div>
  )
}
