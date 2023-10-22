const express = require("express");
const router = express.Router();

const { validate } = require("../../../global/validations/validator");
const { SigninSchema } = require("../../../global/validations/schema");
const { signIn, logout } = require("../../controllers/auth/index");
const { verifyToken } = require("../../../utility/jwt/index");

router.post("/v1/sign-in", validate(SigninSchema), signIn);
router.delete("/v1/logout", verifyToken, logout);
module.exports = router;
