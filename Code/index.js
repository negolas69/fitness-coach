import express from "express";
import { router as userRouter } from "./backend/user/user.router.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(express.static("frontend"));
app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

app.use("/api/user", userRouter);

const apiKey = process.env.OPEN_AI_KEY;
console.log("API Key:", apiKey);
// OpenAI Configuration
const openai = new OpenAI({ apiKey: apiKey });

app.post("/api/query", async (req, res) => {
  const question = req.body.question;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: question,
      max_tokens: 150,
    });

    console.log(response);

    res.json({ response: response.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
