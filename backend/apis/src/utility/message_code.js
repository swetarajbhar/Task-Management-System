const message = {
  find: {
    200: "Ok",
    400: "Bad request",
    401: "Unauthorised",
    403: "Forbidden",
    404: "Data not found.",
    409: "Resource Conflict",
    500: "Internal server error",
  },
  save: {
    200: "Ok",
    400: "Bad request",
    401: "Unauthorised",
    403: "Forbidden",
    404: "data not found.",
    409: "Duplicate Data",
    500: "Internal server error",
  },
  update: {
    200: "Ok",
    400: "Bad request",
    401: "Unauthorised",
    403: "Forbidden",
    404: "data not found.",
    409: "Resource Conflict",
    500: "Internal server error",
  },
  delete: {
    200: "Ok",
    400: "Bad request",
    401: "Unauthorised",
    403: "Forbidden",
    404: "data not found.",
    409: "Resource Conflict",
    500: "Internal server error",
  },
};

module.exports = { message };
