import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getDiets } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';


export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);
  const [input, setInput] = useState({});


  return (
    <div>
      <h1>Create your own Recipe here:</h1>
      <form>
        <label>Recipe Name:</label>
        <input type="text" placeholder="Complete here..." name="title" />
        <label>Summary:</label>
        <input type="text" placeholder="Complete here..." name="summary" />
        <label>Health Level:</label>
        <input className="inputCreate" type="text" name="healthScore" />
        <label>Instructions:</label>
        <textarea
          type="text"
          placeholder="Complete here..."
          name="analyzedInstructions"
        />
        <label>Image:</label>
        <input type="text" placeholder="Example: https://..." name="image" />
        <span>Type of Diet:</span>

      </form>
    </div>
  );
};
