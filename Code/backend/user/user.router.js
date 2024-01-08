import { Router } from "express";

import { create, login, saveGoals, getGoals } from "./user.controller.js";

const router = Router();

router.post("/create", create);
router.post("/login", login);
router.post("/saveGoals", saveGoals);
router.get("/goals", getGoals);
  

export { router };
