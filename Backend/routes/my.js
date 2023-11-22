import express from "express";
import { filterListings } from "../store/listings.js";
import authMiddleware from "../middleware/auth.js";
import mapper from "../mappers/listings.js";

const myRouter = express.Router();

myRouter.get("/listings", authMiddleware, (req, res) => {
  const listings = filterListings(
    (listing) => listing.userId === req.user.userId
  );
  const resources = listings.map(mapper);
  res.send(resources);
});

export default myRouter;
