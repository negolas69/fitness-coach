import express from "express";
import { router as userRouter } from "./backend/user/user.router.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(express.static("frontend"));
app.use(cors());

app.use(bodyParser.json());
app.use("/api/user", userRouter);

app.listen(3001, () => {
  console.log("Server listens to http://localhost:3001");
});
