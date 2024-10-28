exports.getLoginPage = (req,res) => res.render('login');
require('dotenv').config();

exports.postLogin = (req,res) => {
  const { password } = req.body;

  if (password === process.env.AUTH_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/categories');
  }else {
    res.redirect('/auth/login');
  }
}