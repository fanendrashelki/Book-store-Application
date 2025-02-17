const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    avatar: {
      type: String,
      default: "https://www.svgrepo.com/show/213788/avatar-user.svg",
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    favourites: [{ type: mongoose.Types.ObjectId, ref: "books" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "books" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "orders" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", user);
