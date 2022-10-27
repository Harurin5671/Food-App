import {
  GET_RECIPES,
  FILTER_CREATED,
  ORDER_BY_NAME,
  GET_RECIPE_NAME,
  GET_DIETS,
  POST_RECIPE,
  ORDER_BY_SCORE,
  GET_DETAIL,
  FILTER_BY_DIET
} from '../actions/index.js';

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: []
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
    case POST_RECIPE:
      return{
        ...state
      }
    case ORDER_BY_SCORE:
      let orderRecipes =
        action.payload === "desc"
          ? state.recipes.sort((a, b) => a.healthScore - b.healthScore)
          : state.recipes.sort((a, b) => b.healthScore - a.healthScore);
      return {
        ...state,
        recipes: action.payload === "all" ? state.recipes : orderRecipes
      }
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      }
    case FILTER_BY_DIET:
      let totalRecipes = state.allRecipes;
      const recipesApi = totalRecipes.filter((r) => !r.createdDb);
      const filteredRecipesApi = recipesApi.filter((r) =>
        r.diets.includes(action.payload)
      );
      const recipeDb = totalRecipes.filter((r) => r.createdDb);
      const filteredRecipeDb = recipeDb.filter(
        (r) => r.diets.name === action.payload
      );
      const filtered = filteredRecipeDb.concat(filteredRecipesApi);
      const vegetarianApi = totalRecipes.filter((r) => r.vegetarian === true);
      const vegetarianDb = recipeDb.filter(
        (r) => r.diets.name === "vegetarian"
      );
      const vegetarian = vegetarianDb.concat(vegetarianApi);
      const ternario = action.payload === "vegetarian" ? vegetarian : filtered;
  
      return {
        ...state,
        recipes: action.payload === "all" ? totalRecipes : ternario
      };
    default:
      return { ...state };
  };
};