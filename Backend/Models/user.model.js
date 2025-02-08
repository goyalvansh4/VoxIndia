const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Convert email to lowercase
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null, // Required for Google OAuth users
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.png", // Default Profile Picture
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const userModel = model("User", userSchema);
module.exports = userModel;