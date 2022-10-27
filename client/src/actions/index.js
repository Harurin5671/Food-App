import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";

export function getRecipes(){
  return async function(dispatch){
    var data = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: data.data
    });
  };
};

export function filterCreated(payload){
  return{
    type: FILTER_CREATED,
    payload
  };
};

export function orderByName(payload){
  return {
    type: ORDER_BY_NAME,
    payload
  };
};

export function getRecipeName(name){
  return async function(dispatch){
    try{
      var data = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPE_NAME,
        payload: data.data
      })
    }catch(error){
      console.log(error)
    }; 
  };
};

export function getDiets(){
  return async function(dispatch){
    var data = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: data.data
    });
  };
};

export function postRecipe(payload){
  return async function(dispatch){
    const response = await axios.post("http://localhost:3001/recipes", payload);
    console.log(response);
    return response;
  }
}