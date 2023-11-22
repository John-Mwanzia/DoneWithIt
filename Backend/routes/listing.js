import express from "express";
import { getListing } from "../store/listings.js";
import authMiddleware from "../middleware/auth.js";
import mapper from "../mappers/listings.js";

const listingRouter = express.Router();

listingRouter.get("/:id", authMiddleware, (req, res) => {
  const listing = getListing(parseInt(req.params.id));
  if (!listing) return res.status(404).send();
  const resource = mapper(listing);
  res.send(resource);
});

export default listingRouter;
