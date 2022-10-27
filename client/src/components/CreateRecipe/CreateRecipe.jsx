import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { postRecipe, getDiets } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';


export default function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets);
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: []
  });

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    console.log(input);
  };
  
  function handleSelect(e){
    setInput({
      ...input,
      diets: [...input.diets, e.target.value]
    });
  };

  function handleSubmit(e){
    e.preventDefault();
    console.log(input);
    dispatch(postRecipe(input));
    alert("Recipe succesfully Created!!");
    setInput({
      title: "",
      summary: "",
      aggregateLikes: 0,
      healthScore: 0,
      analyzedInstructions: "",
      image: "",
      diets: [],
    });
  };

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch])


  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      <h1>Create your own Recipe here:</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Recipe Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Complete here..."
            name="title"
            value={input.title}
          />
        </div>
        <div>
          <label>Summary:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Complete here..."
            name="summary"
            value={input.summary}
          />
        </div>
        <div>
          <label>Health Level:</label>
          <input
            onChange={(e) => handleChange(e)}
            className="inputCreate"
            type="text"
            name="healthScore"
            value={input.healthScore}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Complete here..."
            name="analyzedInstructions"
            value={input.analyzedInstructions}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Example: https://..."
            name="image"
            value={input.image}
          />
        </div>
        <div>
          <span>Type of Diet:</span>
          <select onChange={(e) => handleSelect(e)}>
            {diets &&
              diets.map((d) => (
                <option value={d.name} key={d.name}>
                  {d.name}
                </option>
              ))}
          </select>
          <ul>
            <li>{input.diets.map((d) => d + ", ")}</li>
          </ul>
          <button type="submit">Create a Recipe</button>
        </div>
      </form>
    </div>
  );
};
