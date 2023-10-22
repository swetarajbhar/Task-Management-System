const express = require("express");
const router = express.Router();

const { validate } = require("../../../global/validations/validator");
const { SigninSchema } = require("../../../global/validations/schema");
const { signIn } = require("../../controllers/auth/index");

router.post("/v1/sign-in", validate(SigninSchema), signIn);

module.exports = router;
