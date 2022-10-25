import {
  GET_RECIPES,
  FILTER_CREATED
} from '../actions/index.js';

const initialState = {
  recipes: [],
  allRecipes: [],
}

export default function rootReducer(state=initialState, action){
  switch(action.type){
    case GET_RECIPES:
      return{
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }
    case FILTER_CREATED:
      const allRecipes = state.allRecipes;
      const createdFilter = action.payload === "create" ? allRecipes.filter(el => el.createDb) : allRecipes.filter(el => !el.createDb);
      return{
        ...state,
        recipes: action.payload === "all" ? state.allRecipes : createdFilter
      }
      default:
      return {...state}
  };
};