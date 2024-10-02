const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.render('index', {title: 'Hero Vault'})
});

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
})