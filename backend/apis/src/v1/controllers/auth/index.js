const { createRespHeader } = require("../../../utility/createResponseHeader");
const { message } = require("../../../utility/message_code");
const { signInService } = require("../../services/auth/index.js");

const signIn = async (req, res, next) => {
  try {
    res.body = createRespHeader();
    const response = await signInService(req.body);
    const responseReceived = response ? 200 : 401;
    res.body.data = response;
    res.body.message = message.find[responseReceived];
    res.status(responseReceived).send({
      status: responseReceived,
      ...res.body,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
};

module.exports = {
  signIn,
};
