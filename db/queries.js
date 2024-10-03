const pool = require('./pool');

exports.getAllCategories = async() => {
  const { rows } = await pool.query(
    `SELECT * FROM categories ORDER BY category_id ASC`
  );
  return rows;
};

exports.getHeroesByCategory = async(category_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM heroes WHERE category_id = $1 ORDER BY name ASC`,
    [category_id]
  );
  return rows;
};

exports.getHeroById = async(hero_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM heroes WHERE hero_id = $1`,
    [hero_id]
  );
  return rows[0];
}