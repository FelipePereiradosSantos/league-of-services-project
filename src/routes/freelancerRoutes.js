import { Router } from "express";
import * as freelancerControllers from "../controllers/freelancerControllers.js";

const router = Router();
router.post("/", freelancerControllers.createFreelancer);

router.get("/", freelancerControllers.getAllFreelancers);
//router.get("/:id", freelancerController.getFreelancerById);

export default router;
