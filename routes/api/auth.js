const express = require("express");
const { validation, ctrlWrapper, authenticate, upload } = require("../../middlewares");
const { joiUserSchemas,joiVerifyEmailSchema } = require("../../models");
const {authController} =require('../../controller')

const router = express.Router();

router.post("/register", validation(joiUserSchemas.joiSingUpSchema), ctrlWrapper(authController.register));
router.get("/verify/:verificationToken", ctrlWrapper(authController.verify));
router.post("/verify/:verificationToken",validation(joiUserSchemas.joiVerifyEmailSchema), ctrlWrapper(authController.resendVerifyEmail));
router.post("/login", validation(joiUserSchemas.joiSingInSchema), ctrlWrapper(authController.login));
router.post("/logout", authenticate, ctrlWrapper(authController.logout));
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(authController.updateAvatar))

module.exports = router;
