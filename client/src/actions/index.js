import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const GET_DETAIL = "GET_DETAIL";

export function getRecipes(){
  return async function(dispatch){
    let response = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: response.data
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
      let response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPE_NAME,
        payload: response.data
      })
    }catch(error){
      console.log(error)
    }; 
  };
};

export function getDiets(){
  return async function(dispatch){
    let response = await axios.get("http://localhost:3001/diets");
    return dispatch({
      type: GET_DIETS,
      payload: response.data
    });
  };
};

export function postRecipe(payload){
  return async function(dispatch){
    let response = await axios.post("http://localhost:3001/recipes", payload);
    return {
      type: POST_RECIPE,
      data: response
    };
  };
};

export function orderByScore(payload){
  return {
    type: ORDER_BY_SCORE,
    payload
  };
};

export function getDetail(id){
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data,
    });
  };
};