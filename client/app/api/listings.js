import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListing = async (listing, onUploadprogress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  // if (listing.location)
  //   data.append("location", JSON.stringify(listing.location));
  // if (listing.location) data.append("location", listing.location);

  return client.post(
    endpoint,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progress) =>
        onUploadprogress(progress.loaded / progress.total),    },
  );

  // return client.post(endpoint, data, {
  //   headers: { "Content-Type": "multipart/form-data" },
  //   onUploadProgress: (progressEvent) => {
  //     const { loaded, total } = progressEvent;
  //     const percentCompleted = Math.round((loaded * 100) / total);
  //     console.log(`Upload progress: ${percentCompleted}%`);
  //     // You can update a progress bar or perform other actions based on the progress here
  //   },
  // });

  // const response = await fetch("http://localhost:9000/api/listings", {
  //   method: "POST",
  //   body: data,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });

  // return response;
};

export default {
  addListing,
  getListings,
};
