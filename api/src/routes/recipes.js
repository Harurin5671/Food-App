const { Router } = require('express');
const { Recipe, Diets } = require("../db");
const router = Router();
const {getApiInfo, getDbInfo, getAllRecipes} = require('../controllers/recipes.js');

router.get("/recipes", async (req, res) => {
  let {name} = req.query;
  let recipes = await getAllRecipes();
  if(name){
    let recipeFilter = recipes.filter(r => r.title.toLowerCase().includes(name.toLowerCase()));
    recipeFilter.length > 0 ? res.status(200).json(recipeFilter): res.status(404).send("The recipe doesn't exist");
  }else{
    res.status(200).json(recipes);
  }
});

router.get("/recipes/:id", async (req, res) => {
  let {id} = req.params;
  let allRecipe = await getAllRecipes();
  if(id){
    let recipeId = await allRecipe.filter(r => r.id == id);
    recipeId.length ? res.status(200).json(recipeId) : res.status(404).send("This character was not found");
  }
});

router.post("/recipes", async (req, res) => {
  let {
    title,
    summary,
    healthScore,
    analyzedInstructions,
    createDb,
    image,
    diets
  } = req.body;

  if (!title || !summary) {
    return res.json("You must enter a title and a summary to create a recipe");
  };

  let createRecipe = await Recipe.create({
    title,
    summary,
    healthScore,
    analyzedInstructions,
    createDb,
    image
  });
  let dietsDb = await Diets.findAll({
    where: {name: diets}
  });
  createRecipe.addDiets(dietsDb);
  res.send("Recipe created successfully");
});

module.exports = router;