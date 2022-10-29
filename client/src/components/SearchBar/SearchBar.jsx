import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeName } from '../../actions';
import style from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  function handleInputChange(e){
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(getRecipeName(input));
    setInput("");
  }

  return (
    <div className={style.navContainer__navbar_searchbar}>
      <input className={style.navContainer__navbar_searchbar_input} type="text" value={input} placeholder="Search..." onChange={(e) => {handleInputChange(e)}}/>
      <button className={style.navContainer__navbar_searchbar_button} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  );
};
