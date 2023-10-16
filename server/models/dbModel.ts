import pkg from "pg";
import dotenv from "dotenv";

// Bring env variables into file
dotenv.config();

// Default to provided env URI or use empty string
const PG_URI = process.env.PG_URI || "";

const { Pool } = pkg;

// Connect to PostgreSQL DB via Pool
const pool = new Pool({
  connectionString: PG_URI,
});

pool.connect((err: Error | undefined) => {
  if (err) console.error("Error connecting to database");
  else console.log("connected to database");
  return;
});

const db = {
  query: async (string: string, params?: string[] | number[]) => {
    try {
      // Log all queries
      console.log("Executed query:", string);
      return await pool.query(string, params);
    } catch (err) {
      if (err) {
        const error = err as string;
        console.error(`Error executing query: ${error}`);
        throw err;
      }
    }
  },
};

export default db;

/*
Create user table with the following
CREATE TABLE users (
  user_id   SERIAL PRIMARY KEY,
  email     VARCHAR(50),
  firstName VARCHAR(50),
  lastName  VARCHAR(50),
  address   VARCHAR(50),
  username  VARCHAR(50),
  password  VARCHAR(100)
);
*/

/*
Create workouts table with the following
CREATE TABLE workouts (
  workout_id   SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(user_id),
  muscleTarget VARCHAR(50),
  workoutName  VARCHAR(50),
  weight       VARCHAR(50),
  reps         VARCHAR(50)
);
*/
