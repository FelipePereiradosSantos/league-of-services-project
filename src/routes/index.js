import { Router } from "express";
import freelancerRoutes from "./freelancerRoutes.js";
import * as freelancerServices from "../services/freelancerServices.js";

const routes = Router();

routes.use("/freelancers", freelancerRoutes);

routes.get("/", async (req, res) => {
    const freelancers = await freelancerServices.getAll(); 
    res.render("index", { freelancers: freelancers });
});

export default routes;
