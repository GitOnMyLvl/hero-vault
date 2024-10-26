const pool = require('./pool');

exports.getAllCategories = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM categories ORDER BY category_id ASC`
    );
    return rows;
  } catch (err) {
    console.error('Error fetching categories:', err);
    throw err;
  }
};

exports.getHeroesByCategory = async (category_id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM heroes WHERE category_id = $1 ORDER BY name ASC`,
      [category_id]
    );
    return rows;
  } catch (err) {
    console.error('Error fetching Heroes:', err);
    throw err;
  }
};

exports.getHeroById = async (hero_id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM heroes WHERE hero_id = $1`,
      [hero_id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error fetching hero:', err);
    throw err;
  }
}

exports.addNewCategory = async (category_name) => {
  try {
    await pool.query(
      `INSERT INTO categories (category_name) VALUES ($1)`, [category_name]
    )
  } catch (err) {
    console.error('Error creating new category:', err);
    throw err;
  }
}

exports.updateCategory = async(category_id, category_name) => {
  try {
    console.log(category_name, category_id)
    await pool.query(
      'UPDATE categories SET category_name = $1 WHERE category_id = $2',
      [category_name, category_id]
    )
  } catch (err) {
    console.error('Error updating category:', err);
    throw err;
  }
}

exports.addNewHero = async ({ category_id, name, real_name, alignment, powers, weaknesses, character_traits, first_appearance }) => {
  try {
    const query = `
      INSERT INTO heroes (category_id, name, real_name, alignment, powers, weaknesses, character_traits, first_appearance)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    const result = await pool.query(query, [
      category_id,
      name,
      real_name,
      alignment,
      powers,
      weaknesses,
      character_traits,
      first_appearance
    ]);
  } catch (err) {
    console.error('Error creating new hero:', err);
    throw err;
  }
}

exports.deleteCategory = async(category_id) => {
  try {
    await pool.query(`
      DELETE FROM categories WHERE category_id = $1
    `, [category_id])
  } catch (err) {
    console.error('Error deleting category:', err);
    throw err;
  }
}

exports.deleteHero = async(hero_id) => {
  try {
    await pool.query(`
      DELETE FROM heroes WHERE hero_id = $1
      `, [hero_id])
  } catch (err) {
    console.error('Error deleting hero:', err);
    throw err;
  }
}