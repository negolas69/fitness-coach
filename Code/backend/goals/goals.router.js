import { Router } from "express";

import { saveGoals, getGoals, removeGoal } from "./goals.controller.js";

const goalsRouter = Router();

goalsRouter.post("/saveGoals", saveGoals);
goalsRouter.post("/goals", getGoals);
goalsRouter.post("/removeGoal", removeGoal);

export { goalsRouter };