const express = require("express");
const { ctrlWrapper, authenticate, validation } = require("../../middlewares");
const { joiUserSchemas } = require("../../models");
const { usersController } = require("../../controller");

const router = express.Router();

router.patch(
    "/",
    authenticate,
    validation(joiUserSchemas.joiSubscriptionSchema),
    ctrlWrapper(usersController.updateSubscription)
);
router.get("/current", authenticate, ctrlWrapper(usersController.getCurrent));

module.exports = router;
