const yup = require("yup");

const SigninSchema = yup.object().shape({
  email: yup.string().email("email is invalid.").required("email is required."),
  password: yup.string().required("password is required."),
});

module.exports = { SigninSchema };
