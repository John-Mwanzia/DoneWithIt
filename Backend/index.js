import express from "express";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import morgan from "morgan";

import categoriesRouter from "./routes/categories.js";

import listingsRouter from "./routes/listings.js";
import listingRouter from "./routes/listing.js";
import userRouter from "./routes/user.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import myRouter from "./routes/my.js";
import expoPushTokensRouter from "./routes/expoPushTokens.js";
import messagesRouter from "./routes/messages.js";
import {developmentConfig} from "./config/index.js"
import multer from "multer";


const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(compression());

app.use("/api/categories", categoriesRouter);
app.use("/api/listing", listingRouter);
app.use("/api/listings", listingsRouter);
app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/my", myRouter);
app.use("/api/expoPushTokens", expoPushTokensRouter);
app.use("/api/messages", messagesRouter);
app.post("/api/post", (req, res) => {
  console.log(req.body);
  res.send("Hello");
}
);

const port = process.env.PORT || developmentConfig.port;
app.listen(port, function() {
  console.log(`Server started on port ${port}...`);
});
