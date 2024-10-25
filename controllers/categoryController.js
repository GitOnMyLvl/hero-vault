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

exports.createNewCategory = asyncHandler(async(req, res) => {
  const { categoryName } = req.body;
  await db.addNewCategory(categoryName);
  res.redirect('/categories');
});

exports.getNewHero = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  res.render('newHero', {categoryId})
});

exports.createNewHero = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  const { name, real_name, alignment, powers, weaknesses, character_traits, first_appearance } = req.body;
  
  //Create arrays for powers, weaknesses and character_traits
  const powersArray = powers.split(', ').map(power => power.trim());
  const weaknessesArray = weaknesses.split(', ').map(weakness => weakness.trim());
  const characterTraitsArray = character_traits.split(', ').map(characterTrait => characterTrait.trim());

  await db.addNewHero({
    category_id: categoryId,
    name,
    real_name,
    alignment,
    powers: powersArray,
    weaknesses: weaknessesArray,
    character_traits: characterTraitsArray,
    first_appearance
  });

  res.redirect(`/categories/${categoryId}`)
});

exports.deleteCategory = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  await db.deleteCategory(categoryId);
  res.redirect('/categories');
});

exports.deleteHero = asyncHandler(async(req, res) => {
  const heroId = req.params.heroId;
  const categoryId = req.params.categoryId;
  await db.deleteHero(heroId);
  res.redirect(`/categories/${categoryId}`);
})