const express = require("express");
const {
  getRandomUser,
  getAllUser,
  postNewUser,
  patchUserUpdate,
  deletedUser,
  patchBulkUserUpdate,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/random", getRandomUser);
router.get("/all", getAllUser);
router.post("/save", postNewUser);
router.patch("/update/:id", patchUserUpdate);
router.patch("/bulk-update", patchBulkUserUpdate);
router.delete("/delete/", deletedUser);

module.exports = router;
