import express from "express";
import Joi from "joi";
import { Expo } from "expo-server-sdk";

import { getListing } from "../store/listings.js";
import { getMessagesForUser, add } from "../store/messages.js";
import sendPushNotification from "../utilities/pushNotifications.js";
import authMiddleware from "../middleware/auth.js";
import validateWith from "../middleware/validation.js";
import { getUserById } from "../store/users.js";

const messagesRouter = express.Router();

const schema = Joi.object({
  listingId: Joi.number().required(),
  message: Joi.string().required(),
});

messagesRouter.get("/", authMiddleware, (req, res) => {
  const messages = getMessagesForUser(req.user.userId);

  const mapUser = (userId) => {
    const user = getUserById(userId);
    return { id: user.id, name: user.name };
  };

  const resources = messages.map((message) => ({
    id: message.id,
    listingId: message.listingId,
    dateTime: message.dateTime,
    content: message.content,
    fromUser: mapUser(message.fromUserId),
    toUser: mapUser(message.toUserId),
  }));

  res.send(resources);
});

messagesRouter.post(
  "/",
  [authMiddleware, validateWith(schema)],
  async (req, res) => {
    const { listingId, message } = req.body;

    const listing = getListing(listingId);
    if (!listing) return res.status(400).send({ error: "Invalid listingId." });

    const targetUser = getUserById(parseInt(listing.userId));
    if (!targetUser) return res.status(400).send({ error: "Invalid userId." });

    add({
      fromUserId: req.user.userId,
      toUserId: listing.userId,
      listingId,
      content: message,
    });

    const { expoPushToken } = targetUser;

    if (Expo.isExpoPushToken(expoPushToken))
      await sendPushNotification(expoPushToken, message);

    res.status(201).send();
  }
);

export default messagesRouter;
