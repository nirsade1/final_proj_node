const jwt = require("jsonwebtoken");
const config = require("../config/defult.json");

//3

async function verify_logged_in(req, res, next) {
  console.log("inside veriify");

  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }
    if (!token) {
      return res.status(401).json({
        status: "401",
        messege: "no token provided!!!",
      });
    }
    //  Verifiy token
    const secretKey = config.jwtKey;
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = decoded;
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }

  next();
}

module.exports = verify_logged_in;
