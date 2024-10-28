module.exports = (req, res, next) => {
  if(req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/auth/login');
}