const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users");
const { validationUser } = require("./validation");

router.post("/registration", validationUser, ctrl.register);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.auth, ctrl.logout);

// Admin: router.get(/:userId) - просмтореть
// блокировать, удалять, назначать других админами
module.exports = router;
