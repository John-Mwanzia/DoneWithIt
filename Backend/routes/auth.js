import { Router } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import validateWith from "../middleware/validation.js";
import { getUserByEmail } from "../store/users.js";

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

const authRouter = Router();

authRouter.post("/", validateWith(schema), (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!user || user.password !== password)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { userId: user.id, name: user.name, email },
    "jwtPrivateKey"
  );
  res.send(token);
});

export default authRouter;
