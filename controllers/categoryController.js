const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

exports.getCategories = asyncHandler(async(req, res) => {
  const categories = await db.getAllCategories();
  res.render('categories', {categories});
});

exports.getHeroesByCategory = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  const heroes = await db.getHeroesByCategory(categoryId);
  res.render('category', {heroes, category_id: categoryId});
});

exports.getHeroById = asyncHandler(async(req, res) => {
  const heroId = req.params.heroId;
  const hero = await db.getHeroById(heroId);
  res.render('hero', {hero: hero, categoryId: hero.category_id});
});