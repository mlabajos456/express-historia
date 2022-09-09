module.exports.sendData = function (res, data, message) {
  return res.status(200).send({
    success: true,
    message: message,
    data: data,
  });
};

module.exports.sendCreated = function (res, data, message) {
  return res.status(201).send({
    success: true,
    message: message,
    data: data,
  });
};

module.exports.sendBadRequest = function (res, message) {
  return res.status(400).send({
    success: false,
    message: message,
  });
};

module.exports.sendUnauthorized = function (res, message) {
  return res.status(401).send({
    success: false,
    message: message,
  });
};

module.exports.sendForbidden = function (
  res,
  message = "You do not have rights to access this resource."
) {
  return res.status(403).send({
    success: false,
    message: message,
  });
};

module.exports.sendNotFound = function (res, message) {
  return res.status(404).send({
    success: false,
    message: message ?? "No se encontro.",
  });
};

module.exports.setHeadersForCORS = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-ALlow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, GET, DELETE"
    );
    return res.status(200).json({});
  }
  next();
};
