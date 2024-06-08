const { db } = require('@vercel/postgres');
const {
  words,
  players,
} = require('../app/lib/placeholder-data.js');


async function seedPlayers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS players (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        score INT,
        level VARCHAR(32)
      );
    `;

    // Insert data into the "users" table
    const insertedPlayers = await Promise.all(
      players.map(async (player) => {
        return client.sql`
        INSERT INTO players (id, name, score, level)
        VALUES ( gen_random_uuid(), ${player.name}, ${player.score}, ${player.level})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedPlayers.length} players`);

    return {
      createTable,
      players: insertedPlayers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedGamePlay(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "gameplay" table if it doesn't exist

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS gameplay (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        playerId VARCHAR(255) NOT NULL,
        score INT,
        level VARCHAR(32),
        date TIMESTAMP DEFAULT current_timestamp,
        FOREIGN KEY (playerId) REFERENCES players(id)
      );
    `;

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedWords(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "words" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS words (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        word VARCHAR(255) NOT NULL,
        dictionary TEXT,
        level VARCHAR(32),
        image_url VARCHAR(255)
      );
    `;

    console.log(`Created "words" table`);

    // Insert data into the "word" table
    const insertedWords = await Promise.all(
      words.map(async (word) => {
        return client.sql`
        INSERT INTO words (id, word, dictionary, level, image_url)
        VALUES ( gen_random_uuid(), ${word.word}, ${word.dictionary}, ${word.level}, ${word.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedWords.length} words`);

    return {
      createTable,
      words: insertedWords,
    };
  } catch (error) {
    console.error('Error seeding words:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  console.log('connected :: ');

  await seedPlayers(client);
  await seedWords(client);
  await seedGamePlay(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});