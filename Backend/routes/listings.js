import express from "express";
import Joi from "joi";
import multer from "multer";
// import listings from "../store/listings.js";
import { getCategory } from "../store/categories.js";
import validateWith from "../middleware/validation.js";
// import authMiddleware from "../middleware/auth";
import imageResize from "../middleware/imageResize.js";
// import delay from "../middleware/delay";
import listingMapper from "../mappers/listings.js";
import { defaultConfig } from "../config/index.js";
import { getListings, addListing } from "../store/listings.js";

const listingsRouter = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number()
    .required()
    .min(1),
  categoryId: Joi.number()
    .required()
    .min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
});

const validateCategoryId = (req, res, next) => {
  if (!getCategory(parseInt(req.body.categoryId)))
    return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

listingsRouter.get("/", async (req, res) => {
  const listings = getListings();
  const resources = listings.map(listingMapper);
  res.send(resources);
});

listingsRouter.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // authMiddleware,
    upload.array("images", defaultConfig.maxImageCount),
    validateWith(schema),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {

    try {

      const listing = {
        title: req.body.title,
        price: parseFloat(req.body.price),
        categoryId: parseInt(req.body.categoryId),
        description: req.body.description,
      };
      listing.images = req.images.map((fileName) => ({ fileName }));
      if (req.body.location) listing.location = JSON.parse(req.body.location);
      if (req.user) listing.userId = req.user.userId;
  
      const result = addListing(listing);
      // console.log('API Result:', result); // Log the result for inspection
  
      res.status(201).send(listing);
      
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
      
    }
   

   
  }
);

export default listingsRouter;
