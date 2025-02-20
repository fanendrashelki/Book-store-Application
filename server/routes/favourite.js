const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/book");
const authMiddleware = require("../middlewares/auth");

router.post("/add-favourite", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.body;
    const userData = await User.findById(id);
    const bookExists = userData.favourites.includes(bookid);
    if (bookExists) {
      return res.status(400).json({ message: "Book is already in favourite" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

    res.status(200).json({ message: "Book Added to favourite" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/remove-favourite", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.body;
    const userData = await User.findById(id);
    const bookExists = userData.favourites.includes(bookid);
    if (!bookExists) {
      res.status(200).json({ message: "Book not found in favourite" });
    }
    await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    res.status(200).json({ message: "Book remove from favourite" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/get-favourite", authMiddleware, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");

    const favouriteBook = userData.favourites;
    if (!favouriteBook || favouriteBook.length === 0) {
      return res.status(400).json({ message: "Book not found in favourite" });
    }

    return res.json({ Status: "success", data: favouriteBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
