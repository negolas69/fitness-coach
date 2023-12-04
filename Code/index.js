import express from "express";
// import userRouter from "./backend/user/user.router.js";

const app = express();

app.use(express.static("frontend"));

app.use(express.json());
// app.use("/api/user", userRouter);

app.listen(3001, () => {
  console.log("Server listens to http://localhost:3001");
});
