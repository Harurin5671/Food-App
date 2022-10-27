import {
  GET_RECIPES,
  FILTER_CREATED,
  ORDER_BY_NAME,
  GET_RECIPE_NAME,
  GET_DIETS
} from '../actions/index.js';

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: []
};

export default function rootReducer(state=initialState, action){
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case FILTER_CREATED:
      const allRecipes = state.allRecipes;
      const createdFilter =
        action.payload === "create"
          ? allRecipes.filter((el) => el.createDb)
          : allRecipes.filter((el) => !el.createDb);
      return {
        ...state,
        recipes: action.payload === "all" ? state.allRecipes : createdFilter,
      };
    case ORDER_BY_NAME:
      let sortedRecipes =
      action.payload === "a-z"
        ? state.recipes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            if (b.title.toLowerCase() > a.title.toLowerCase()) {
              return -1;
            }
            return 0;
          })
        : state.recipes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return -1;
            }
            if (b.title.toLowerCase() > a.title.toLowerCase()) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        recipes: action.payload === "all" ? state.allRecipes : sortedRecipes,
      }
    case GET_RECIPE_NAME:
      return {
        ...state,
        recipes: action.payload
      }
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      }
    default:
      return { ...state };
  };
};