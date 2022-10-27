import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { postRecipe, getDiets } from "../../actions";
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
  let errors = {};
  input.title
    ? (errors.title = "")
    : (errors.title = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    if(input.image === ""){
      errors.image = ""
    }
    errors.image = "This isn't a valid image address";
  } else {
    errors.image = "";
  }
  return errors;
}


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
  const [errors, setErrors] = useState({});

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
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    console.log(input);
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

  function handleDelete(e, d) {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== d),
    });
  }

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
          {errors.title && (<p>{}errors.title</p>)}
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
          {errors.summary && <p>{errors.summary}</p>}
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
          {errors.image && <p>{errors.image}</p>}
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
          {input.diets.map((d, i) => (
              <ul key={i}>
                <li>{d}</li>
                <button onClick={(e) => handleDelete(e, d)}>x</button>
              </ul>
            ))}
            {errors.diets && <p>{errors.diets}</p>}
          <button type="submit">Create a Recipe</button>
        </div>
      </form>
    </div>
  );
};
