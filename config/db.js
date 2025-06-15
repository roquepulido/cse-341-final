import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbName = process.env.DB_NAME || "final_project_db";

const dbUrl =
  process.env.ENV === "development"
    ? process.env.MONGO_URL_DEV
    : process.env.MONGO_URL;

console.log(`MongoDB URL: ${dbUrl}`);

export const initDb = (callback) => {
  mongoose
    .connect(dbUrl, { dbName: dbName })
    .then(() => {
      console.log("Mongoose connected!");
      if (callback) callback(null);
    })
    .catch((err) => {
      console.error("Mongoose connection error:", err);
      if (callback) callback(err);
    });
};
export default {
  dbName: dbName,
  dbUrl: dbUrl,
  initDb: initDb,
};
