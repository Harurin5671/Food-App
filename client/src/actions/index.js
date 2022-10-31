import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

export function getRecipes() {
  return async function (dispatch) {
    let response = await axios.get("/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function getRecipeName(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPE_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    let response = await axios.get("/diets");
    return dispatch({
      type: GET_DIETS,
      payload: response.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    let response = await axios.post("/recipes", payload);
    return {
      type: POST_RECIPE,
      data: response,
    };
  };
}

export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/recipes/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}
