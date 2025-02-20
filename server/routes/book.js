const router = require("express").Router();
const User = require("../models/User");
const authMiddleware = require("../middlewares/auth");
const Book = require("../models/book");

// Add Book (Admin Only)
router.post("/add-book", authMiddleware, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id)
      return res
        .status(400)
        .json({ message: "User ID is required in headers." });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access Denied. Admins only." });

    const { url, title, author, price, desc, language } = req.body;

    if (!url || !title || !author || !desc || !language || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBook = new Book({ url, title, author, price, desc, language });

    await newBook.save();

    return res.status(201).json({ message: "Book added successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Update Book (Admin Only)
router.put("/update-book", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    console.log(req.headers);

    if (!id)
      return res
        .status(400)
        .json({ message: "User ID is required in headers." });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access Denied. Admins only." });

    const book = await Book.findById(bookid);
    if (!book) return res.status(404).json({ message: "Book not found." });

    const updateData = req.body;
    await Book.findByIdAndUpdate(bookid, { $set: updateData }, { new: true });

    return res.status(200).json({ message: "Book updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Delete Book (Admin Only) - Fixed Method & Logic
router.delete("/delete-book", authMiddleware, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    if (!id)
      return res
        .status(400)
        .json({ message: "User ID is required in headers." });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access Denied. Admins only." });

    const book = await Book.findById(bookid);
    if (!book) return res.status(404).json({ message: "Book not found." });

    await Book.findByIdAndDelete(bookid);

    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Get Book List - Fixed Route & Response
router.get("/book-list", authMiddleware, async (req, res) => {
  try {
    const bookList = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({ status: "Success", data: bookList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/book-recent-list", authMiddleware, async (req, res) => {
  try {
    const bookList = await Book.find().sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({ status: "Success", data: bookList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
