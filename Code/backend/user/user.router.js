import { Router } from "express";

import { create, login } from "./user.controller.js";

const router = Router();

router.post("/create", create);
router.post("/login", login);

export { router };
