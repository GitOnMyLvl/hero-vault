require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const homeRouter = require('./routes/homeRouter');
const categoryRouter = require('./routes/categoryRouter');
const authRouter = require('./routes/authRouter');
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 * 30}
}));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);


app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
})