const jwt = require("jsonwebtoken");
const { TOKEN_JWTSECRET, TOKEN_JWTEXPIRY } = process.env;

const generateToken = async (params) => {
  try {
    const tokenParams = {
      email: params.email,
    };

    const x_access_token = jwt.sign(tokenParams, `${TOKEN_JWTSECRET}`, {
      expiresIn: `${TOKEN_JWTEXPIRY}`,
    });

    return x_access_token;
  } catch (error) {
    console.error(" JWT -> API -> UTIL -> jwt = > generateToken()", error);
    throw error;
  }
};

module.exports = {
  generateToken,
};
