import express from "express";
import { createMoviesRouter, moviesApi } from "./moviesApi.js";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const envFile = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(envFile, "../.env") });

const app = express();

app.use(bodyParser.json());
app.use("/api/movies", moviesApi);
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const client = new MongoClient(process.env.MONGODB_URL);
client.connect().then((connection) => {
  const db = connection.db("sample_mflix");
  createMoviesRouter(db);
});

app.listen(process.env.PORT || 3000);
