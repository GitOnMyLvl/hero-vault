require("dotenv").config();

const { Client } = require("pg");

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS heroes(
    hero_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
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


  INSERT INTO heroes (category_id, name, alignment, powers, weaknesses, character_traits, first_appearance)
  VALUES 
  (2, 'Batman', 'neutral', ARRAY['high-tech equipment', 'strong muscles'], ARRAY['no superpowers'], ARRAY['smart', 'mysterious'], 'Detective Comics #27 - 1939');


  INSERT INTO heroes (category_id, name, alignment, powers, weaknesses, character_traits, first_appearance)
  VALUES 
  (1, 'Spider-Man', 'good', ARRAY['spider-sens', 'wall climbing', 'superhuman strength'], ARRAY['emotions', 'radiation'], ARRAY['brave', 'smart'], 'Amazing Fantasy #15 - 1962');

  INSERT INTO heroes (category_id, name, alignment, powers, weaknesses, character_traits, first_appearance)
  VALUES 
  (2, 'Joker', 'evil', ARRAY['madness'], ARRAY['no superpowers', 'crazy'], ARRAY['chaotic', 'manipulative'], 'Batman #1 - 1940');


  INSERT INTO heroes (category_id, name, alignment, powers, weaknesses, character_traits, first_appearance)
  VALUES 
  (1, 'Iron Man', 'good', ARRAY['armor', 'high-tech equipment', 'flying'], ARRAY['arc reactor'], ARRAY['arrogant', 'smart'], 'Tales of Suspense #39 - 1963');

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
