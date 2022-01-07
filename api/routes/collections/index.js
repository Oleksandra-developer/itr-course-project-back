const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/collections")
const {auth} = require('../../../controllers/users')
const { validationCollection } = require("./validation");

router.post("/create", validationCollection, auth, ctrl.create);
router.get("/list", auth, ctrl.getAll);
router.post("/delete/:collectionId", auth, ctrl.remove);        
router.patch("/update/:collectionId", auth, ctrl.update);
router.get("/:collectionId", ctrl.getById);

module.exports = router;