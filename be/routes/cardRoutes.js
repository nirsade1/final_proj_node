const { Router } = require("express");
const router = Router();
const cardControllers = require("../controllers/cardControllers");
const verify_logged_in = require("../middleware/verify_logged_in");

router.get("/show", verify_logged_in, cardControllers.cards_array);
router.post("/", verify_logged_in, cardControllers.card_post);
router.get("/:id", verify_logged_in, cardControllers.get_card);
router.put("/:id", verify_logged_in, cardControllers.update_card);
router.delete("/:id", verify_logged_in, cardControllers.delete_card);

module.exports = router;
