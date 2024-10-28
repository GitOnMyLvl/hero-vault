const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator') ;
const db = require('../db/queries');

exports.getCategories = asyncHandler(async(req, res) => {
  const categories = await db.getAllCategories();
  res.render('categories', {categories});
});

exports.createNewCategory = asyncHandler(async(req, res) => {
  const { categoryName } = req.body;
  await db.addNewCategory(categoryName);
  res.redirect('/categories');
});

exports.editCategory = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  const { categoryName } = req.body;
  await db.updateCategory( categoryId, categoryName );
  res.redirect('/categories')
});

exports.deleteCategory = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  await db.deleteCategory(categoryId);
  res.redirect('/categories');
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

exports.getNewHero = asyncHandler(async(req, res) => {
  const categoryId = req.params.categoryId;
  res.render('heroForm', {categoryId, hero: null})
});

exports.getEditHero = asyncHandler(async (req, res) => {
  const { categoryId, heroId} = req.params;
  const hero = await db.getHeroById(heroId);
  res.render('heroForm', {categoryId, hero});
})

exports.saveHero = asyncHandler(async(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const categoryId = req.params.categoryId;
  const heroId = req.params.heroId || null;
  const { name, real_name, alignment, powers, weaknesses, character_traits, first_appearance } = req.body;
  
  //Create arrays for powers, weaknesses and character_traits
  const powersArray = powers.split(', ').map(power => power.trim());
  const weaknessesArray = weaknesses.split(', ').map(weakness => weakness.trim());
  const characterTraitsArray = character_traits.split(', ').map(characterTrait => characterTrait.trim());

  const heroData = {
    category_id: categoryId,
    name,
    real_name,
    alignment,
    powers: powersArray,
    weaknesses: weaknessesArray,
    character_traits: characterTraitsArray,
    first_appearance
  };

  if(heroId) {
    await db.updateHero(heroId, heroData);
  }else{
    await db.addNewHero(heroData);
  }

  res.redirect(`/categories/${categoryId}`)
});

exports.deleteHero = asyncHandler(async(req, res) => {
  const heroId = req.params.heroId;
  const categoryId = req.params.categoryId;
  await db.deleteHero(heroId);
  res.redirect(`/categories/${categoryId}`);
})