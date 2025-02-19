const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/book");
const authMiddleware = require("../middlewares/auth");

router.post("/add-cart", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const bookExists = userData.cart.includes(bookid);
    if (bookExists) {
      return res.status(400).json({ message: "Book is already in cart" });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

    res.status(200).json({ message: "Book Added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/remove-cart", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const bookExists = userData.cart.includes(bookid);
    if (!bookExists) {
      res.status(200).json({ message: "Book not found in cart" });
    }
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    res.status(200).json({ message: "Book remove from cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/get-cart", authMiddleware, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");

    if (!userData || !userData.cart) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = userData.cart.reverse();
    return res.json({ status: "success", cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
