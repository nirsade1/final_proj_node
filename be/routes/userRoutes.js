const { Router } = require("express");
const router = Router();
const userControllers = require("../controllers/userControllers");
const verify_logged_in = require("../middleware/verify_logged_in");

//Create
router.post("/signup", userControllers.signup); //1
router.post("/login", userControllers.login); //2
router.get("/me", verify_logged_in, userControllers.veriifyGet); //3

module.exports = router;
