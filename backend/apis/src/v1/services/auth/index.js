const bcrypt = require("bcrypt");

const { user } = require("../../../../mongodb/models/user");
const { generateToken } = require("../../../utility/jwt/index");

async function matchPassword(params, findUser) {
  const matchPasswordResult = (await bcrypt.compareSync(
    params.password,
    findUser.password
  ))
    ? true
    : false;
  return matchPasswordResult;
}

const signInService = async (params) => {
  try {
    const findUser = await user.findOne({
      email: params.email,
    });

    const validatePassword =
      findUser && findUser !== null && (await matchPassword(params, findUser));

    const token = validatePassword && (await generateToken(params));

    token &&
      (await user.findOneAndUpdate(
        { email: params.email },
        {
          x_access_token: token,
        }
      ));

    return findUser && validatePassword
      ? {
          userId: findUser?._id,
          userName: findUser?.user_name,
          userType: findUser?.user_type,
          xAccessToken: token,
        }
      : null;
  } catch (error) {
    throw error;
  }
};

const logoutService = async (params) => {
  try {
    return await user.findOneAndUpdate(
      { _id: params.userId },
      {
        x_access_token: null,
      }
    );
  } catch (error) {
    throw error;
  }
};
module.exports = {
  signInService,
  logoutService,
};
