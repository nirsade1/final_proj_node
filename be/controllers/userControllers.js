const userSchema = require("../schema/userSchema");
const userModel = require("../model/userModel");
const credentialsSchema = require("../schema/credentialsSchema");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("../config/defult.json");
const jwt = require("jsonwebtoken");

//User Create 1
const signup = async (req, res) => {
  try {
    //input validation
    const joiUser = new userSchema(req.body); //get details from paostman
    const error = joiUser.validatePost(); //chack the details
    if (error) return res.status(400).send(error); //if err true send err

    let userCheck = await userModel.findOne({ email: req.body.email }); //find one email
    if (userCheck) return res.status(400).send("User already registered");

    //SALT + Hash
    const salt = await bcrypt.genSalt(10);
    joiUser.password = await bcrypt.hash(joiUser.password, salt); //make hash password

    //Add user to DB
    const user = await userModel.create(joiUser);

    console.log(user);
    res.status(200).json({
      Email: `${user.email}`,
      UserId: `${user.id}`,
    });

    console.log("User created");
  } catch (err) {
    res.status(400).json({
      error: `there was a problem: ${err} `,
    });

    console.log(err);
  }
};

//2 LOGIN USER
const login = async (req, res) => {
  try {
    console.log(`inside login`);
    //input validation (email+password)
    const credentials = new credentialsSchema(req.body);
    const error = credentials.validatePost2();
    if (error) return res.status(400).send(error);

    ///EMAIL CHACK
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    //JWT + 200
    // create token with jwt & config
    const secretKey = config.jwtKey;
    // const ret = new userModel(req.body);
    const { _id, biz } = user;
    const token = jwt.sign({ _id, biz }, secretKey);

    //Create new cookie
    res.cookie("jwt", token, { httpOnly: true, expiresIn: "20m" });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

//3

const veriifyGet = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await userModel.findById(decoded._id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

//..................................................................

module.exports = {
  signup,
  login,
  veriifyGet,
};
