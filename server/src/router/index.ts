import express from "express";
import userRoutes from "./user-routes";
import authRoutes from "./auth-routes";
import articleRoutes from "./article-routes";
import categoryRoutes from "./category-routes";
import neo4jRoutes from "./neo4j-routes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);

router.use("/neo4j", neo4jRoutes);

export default router;
