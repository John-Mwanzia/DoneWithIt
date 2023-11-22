const validateWith = (schema) => (req, res, next) => {
  // Convert location string to JSON object if present
  // console.log(req.body);
  // if (req.body.location) {
  //   req.body.location = JSON.parse(req.body.location);
  // }
  const { error, value } = schema.validate(req.body);

  if (error) {
    console.error("Validation Error:", error);
    return res.send({ error: error.details[0].message });
  }

  next();
};

export default validateWith;
