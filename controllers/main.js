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
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `hello from ${req.user.username}`,
    secret: `Here is your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashbord };
