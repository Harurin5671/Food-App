import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandindPage() {
  return (
    <div className={style.container}>
      <h1 className={style.wlc}>Welcome to my Food-App</h1>
      <Link to="/home">
        <button className={style.btn}>Let´s Start</button>
      </Link>
    </div>
  );
};
