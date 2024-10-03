require("dotenv").config();

const { Client } = require("pg");

const SQL = `
  DROP TABLE IF EXISTS heroes;
  DROP TABLE IF EXISTS categories;

  CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS heroes (
    hero_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    real_name VARCHAR(255),
    alignment VARCHAR(255),
    powers TEXT[],
    weaknesses TEXT[],
    character_traits TEXT[],
    first_appearance VARCHAR(255),
    CONSTRAINT fk_category
      FOREIGN KEY (category_id)
      REFERENCES categories (category_id)
      ON DELETE CASCADE
  );

  INSERT INTO categories (name) 
  VALUES 
  ('Marvel'),
  ('DC');

  INSERT INTO heroes (category_id, name, real_name, alignment, powers, weaknesses, character_traits, first_appearance)
  VALUES 
  (2, 'Batman', 'Bruce Wayne', 'neutral', ARRAY['high-tech equipment', 'strong muscles'], ARRAY['no superpowers'], ARRAY['smart', 'mysterious'], 'Detective Comics #27 - 1939'),
  
  (1, 'Spider-Man', 'Peter Parker', 'good', ARRAY['spider-sens', 'wall climbing', 'superhuman strength'], ARRAY['emotions', 'radiation'], ARRAY['brave', 'smart'], 'Amazing Fantasy #15 - 1962'),

  (2, 'Joker', NULL, 'evil', ARRAY['madness'], ARRAY['no superpowers', 'crazy'], ARRAY['chaotic', 'manipulative'], 'Batman #1 - 1940'),

  (1, 'Iron Man', 'Tony Stark', 'good', ARRAY['armor', 'high-tech equipment', 'flying'], ARRAY['arc reactor'], ARRAY['arrogant', 'smart'], 'Tales of Suspense #39 - 1963');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  try {
    await client.connect();
    await client.query(SQL);
  } catch (error) {
    console.error("Error executing SQL:", error);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
