import express from "express";
import authMiddleware from "../middleware/auth.js";
import { filterListings } from "../store/listings.js";
import {getUserById} from "../store/users.js";

const userRouter = express.Router();

userRouter.get("/:id", authMiddleware, async(req, res) => {
  const userId = parseInt(req.params.id);
  const user = getUserById(userId);
  if (!user) return res.status(404).send();

  const listings = filterListings(
    (listing) => listing.userId === userId
  );

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    listings: listings.length,
  });
});

export default userRouter;
