const jwt = require("jsonwebtoken");

const { user } = require("../../../mongodb/models/user");

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

const verifyToken = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ");
      if (token && token[0] === "Bearer" && token[1]) {
        jwt.verify(
          token[1],
          `${TOKEN_JWTSECRET}`,
          async (error, verifiedData) => {
            if (verifiedData) {
              const decodedUser = await user.findOne({
                email: verifiedData.email,
              });
              if (decodedUser && decodedUser.x_access_token === token[1]) {
                req.userId = decodedUser?._id;
                return next();
              } else {
                res.status(401).send({
                  status: 401,
                  message: "Unauthorized Access",
                });
              }
            } else {
              res.status(401).send({
                status: 401,
                message: "Unauthorized Access",
              });
            }
          }
        );
      }
    } else {
      res.status(401).send({
        status: 401,
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
