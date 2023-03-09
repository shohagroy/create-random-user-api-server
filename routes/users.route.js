const express = require("express");
const {
  getRandomUser,
  getAllUser,
  postNewUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/random", getRandomUser);
router.get("/all", getAllUser);
router.post("/save", postNewUser);

module.exports = router;
