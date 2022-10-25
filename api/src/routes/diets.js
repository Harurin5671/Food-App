const { Router } = require('express');
const {API_KEY} = process.env
const{ Recipe, Diets } = require('../db');
const router = Router();
const axios = require('axios');

router.get("/diets", async (req, res) => {
  const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
  const type = await recipesApi.data.results.map(e => e.diets);
  const diets = type.flat();
  const typeDiets = [...new Set(diets), "Vegetarian"];
  typeDiets.forEach(d => {
    Diets.findOrCreate({
      where:{name: d}
    });
  });
  const allDiets = await Diets.findAll();
  res.status(200).json(allDiets);
});

module.exports = router;