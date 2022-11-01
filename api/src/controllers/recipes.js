require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diets } = require("../db");

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      image: e.image,
      diets: e.diets.map((d) => d),
      summary: e.summary,
      healthScore: e.healthScore,
      analyzedInstructions: e.analyzedInstructions.map((p) => p),
    };
  });
  const apiOffset = await apiUrl.data.offset;
  console.log(apiOffset);
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllRecipes,
};
