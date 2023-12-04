import express from "express";
import { router as userRouter } from "./backend/user/user.router.js";
import cors from "cors";
const app = express();

app.use(express.static("frontend"));
app.use(cors());

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(3001, () => {
  console.log("Server listens to http://localhost:3001");
});
