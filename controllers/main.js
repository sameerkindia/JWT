const jwt = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomError("please check your username or password", 400);
  }

  const id = new Date().getDay();

  const token = jwt.sign({ username, id }, "sameer", { expiresIn: "1d" });

  res.status(200).json({ msg: "user created", token });
};

const dashbord = async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader.startsWith("Bearer "));

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, "sameer");
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `hello from ${decode.username}`,
      secret: `Here is your lucky number is ${luckyNumber}`,
    });
  } catch {
    throw new CustomError("No token provided", 401);
  }
};

module.exports = { login, dashbord };
