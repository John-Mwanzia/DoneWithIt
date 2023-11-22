import { developmentConfig } from "../config/index.js";

const mapper = (listing) => {
  const baseUrl = developmentConfig.assetsBaseUrl;
  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return {
    ...listing,
    images: listing.images.map(mapImage),
  };
};

export default mapper;
