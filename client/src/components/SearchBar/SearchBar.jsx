import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeName } from '../../actions';

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
    <div>
      <input type="text" value={input} placeholder="Search..." onChange={(e) => {handleInputChange(e)}}/>
      <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  );
};
