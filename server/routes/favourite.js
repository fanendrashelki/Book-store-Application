const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/book");
const authMiddleware = require("../middlewares/auth");

router.post("/add-favourite", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const userData = await User.findById(id);
    const bookExists = userData.favourites.includes(bookid);
    if (bookExists) {
      return res.status(400).json({ message: "Book is alredy in favourite" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

    res.status(200).json({ message: "Book Added to favourite" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/remove-favourite", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
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
    const { id, bookid } = req.headers;
    const userData = await User.findById(id).populate("favourites");

    const favouriteBook = userData.favourites;
    console.log(favouriteBook);
    if (!favouriteBook) {
      res.status(400).json({ message: "Book not found in favourite" });
    }

    return res.json({ Status: "Sccess", data: favouriteBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
