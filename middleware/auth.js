const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");

const authenticationMiddlewere = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, "sameer");

    const { id, username } = decode;

    req.user = { id, username };
    next();
  } catch {
    throw new CustomError("No token provided", 401);
  }

  next();
};

module.exports = authenticationMiddlewere;
