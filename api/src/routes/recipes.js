const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();
const {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
} = require("../controllers/recipes.js");

router.get("/recipes", async (req, res) => {
  let { name } = req.query;
  let recipes = await getAllRecipes();
  if (name) {
    let recipeFilter = recipes.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    );
    recipeFilter.length > 0
      ? res.status(200).json(recipeFilter)
      : res.status(404).send("The recipe doesn't exist");
  } else {
    res.status(200).json(recipes);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();
  let validate = id.includes("-");

  if (validate) {
    try {
      let dbId = await Recipe.findByPk(id, { include: Diets });
      res.status(200).json([dbId]);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      if (id) {
        let recipeId = await allRecipes.filter((el) => el.id === parseInt(id));
        recipeId.length
          ? res.status(200).send(recipeId)
          : res.status(400).send("Not found");
      }
    } catch (err) {
      res.json({ message: err });
    }
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
    diets,
  } = req.body;

  if (!title || !summary) {
    return res.json("You must enter a title and a summary to create a recipe");
  }

  let createRecipe = await Recipe.create({
    title,
    summary,
    healthScore,
    analyzedInstructions,
    createDb,
    image,
  });
  let dietsDb = await Diets.findAll({
    where: { name: diets },
  });
  createRecipe.addDiets(dietsDb);
  res.send("Recipe created successfully");
});

module.exports = router;
