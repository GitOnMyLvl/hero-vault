exports.getHomePage = (req, res) => {
  res.render('index', {title: 'Hero Vault'});
};