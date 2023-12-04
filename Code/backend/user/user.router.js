import { Router } from "express";

import { create } from "./user.controller.js";

const router = Router();

router.post("/create", create);

export { router };
