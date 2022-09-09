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
  var oneof = false;
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }
  if (req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
    oneof = true;
  }
  if (req.headers['access-control-request-headers']) {
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    oneof = true;
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
};
