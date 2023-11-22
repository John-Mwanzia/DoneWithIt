import express from "express";
import Joi from "joi";
import validateWith from "../middleware/validation.js";
import { addUser, getUserByEmail, getUsers } from "../store/users.js";

const usersRouter = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

usersRouter.post("/", validateWith(schema), (req, res) => {
  const { name, email, password } = req.body;
  if (getUserByEmail(email))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });

  const user = { name, email, password };
  addUser(user);

  res.status(201).send(user);
});

usersRouter.get("/", (req, res) => {
  res.send(getUsers());
});

export default usersRouter;
