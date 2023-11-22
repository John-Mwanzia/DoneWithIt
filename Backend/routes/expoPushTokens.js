import express from "express";
import Joi from "joi";
import authMiddleware from "../middleware/auth.js";
import validateWith from "../middleware/validation.js";
import { getUserById } from "../store/users.js";

const expoPushTokensRouter = express.Router();

const validationSchema = Joi.object({
  token: Joi.string().required(),
});

expoPushTokensRouter.post(
  "/",
  [authMiddleware, validateWith(validationSchema)],
  (req, res) => {
    const user = getUserById(req.user.userId);
    if (!user) return res.status(400).send({ error: "Invalid user." });

    user.expoPushToken = req.body.token;
    console.log("User registered for notifications: ", user);
    res.status(201).send();
  }
);

export default expoPushTokensRouter;
