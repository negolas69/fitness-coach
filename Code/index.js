import express from "express";
// import movieRouter from "./api/movies.js";

const app = express();

app.use(express.static("frontend"));

app.use(express.json());
// app.use("/api/movie", movieRouter);

app.listen(3001, () => {
  console.log("Server listens to http://localhost:3001");
});
