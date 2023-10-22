const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    user_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    x_access_token: {
      type: String,
    },
    created_by: {
      type: String,
    },
    created_name: {
      type: String,
    },
    updated_by: {
      type: String,
    },
    updated_name: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", //change createdAt -> created_at
      updatedAt: "updated_at", //change updatedAt -> updated_at
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const user = mongoose.model("user", UserSchema, "user");
module.exports = { user };
