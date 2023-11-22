import express from "express";
import categoriesStore, { getCategories } from "../store/categories.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", (req, res) => {
  const categories = getCategories();
  res.send(categories);
});

export default categoriesRouter;
