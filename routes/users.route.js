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

/**
 * @api {get} /user/random
 * @apiDescription get random user
 * @apiPermission all user
 *
 * @apiSuccess {Object} random 1 user data
 *
 * @apiError (Unauthorized 403)  user not found!
 */
router.get("/random", getRandomUser);

/**
 * @api {get} /user/tools
 * @apiDescription Get all user
 * @apiPermission all user
 *
 * @apiParam  {Number{1++}}   [limit=10]  Users par call
 *
 * @apiSuccess  [object{}]/array of object all the user
 * @apiError (Unauthorized 403)  user not found!
 */
router.get("/all", getAllUser);

/**
 * @api {post} user/save
 * @apiDescription add a new user
 * @apiPermission all user
 *
 * @apiHeader {String} Content-Type   application/json
 * @apiBody {object} {id, gender, name, contact, address, photoUrl }
 *
 * @apiSuccess JSON({string}) Successfully user added!
 *
 * @apiError (Unauthorized 403)  "Filed! can't added user! try agin."
 */
router.post("/save", postNewUser);

/**
 * @api {patch} /user/update/2
 * @apiDescription update a user proparty value
 * @apiPermission all user
 *
 * @apiHeader {String} Content-Type   application/json
 * @apiBody {object} update value {id, gender, name, contact, address, photoUrl }
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the tools.
 *
 * @apiSuccess JSON({string}) Successfully user update!
 *
 * @apiError (Unauthorized 403)  "Filed! can't update user! try agin."
 */
router.patch("/update/:id", patchUserUpdate);

/**
 * @api {patch} /user/bulk-update
 * @apiDescription update multiple user proparty value
 * @apiPermission all user
 *
 * @apiHeader {String} Content-Type   application/json
 * @apiBody  [object{}]/array of object all update user value
 *
 * @apiSuccess [object{}] array of object
 *
 * @apiSuccess JSON({string}) update success: 2, failed: 0
 *
 * @apiError (Unauthorized 403)  "Filed! can't update user! try agin."
 */
router.patch("/bulk-update", patchBulkUserUpdate);

/**
 * @api {delete} /user/delete
 * @apiDescription delete a user
 * @apiPermission all user
 *
 * @apiHeader {String} Content-Type   application/json
 * @apiBody  {object} ex: {id: 3}
 *
 * @apiSuccess JSON({string}) Successfully! user delete!
 *
 * @apiError (Unauthorized 403)  "Filed! can't delete user! try agin."
 */
router.delete("/delete/", deletedUser);

module.exports = router;
