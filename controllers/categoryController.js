exports.getCategories = (req, res) => {
  //Database query to get Data WIP
  res.render('categories');
}

exports.getCategoryByName = (req, res) => {
  //Database query to get category name WIP
  const categoryName = req.params.categoryName;
  res.render('category', {categoryName})
}

exports.getHeroByName = (req, res) => {
  //DB query to get hero WIP
  res.render('hero');
}