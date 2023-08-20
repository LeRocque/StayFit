import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const PG_URI = process.env.PG_URI;

const { Pool } = pkg;

const pool = new Pool({
  connectionString: PG_URI,
});

pool.connect((err: Error) => {
  if (err) console.error("Error connecting to database");
  else console.log("connected to database");
  return;
});

const db = {
  query: async (string: string, params?: any[]): Promise<any> => {
    try {
      return await pool.query(string, params);
    } catch (err) {
      console.error(`Error executing query: ${err}`);
      throw err;
    }
  },
};

export default db;
