const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const favouriteRoute = require("./routes/favourite");
const cartRoute = require("./routes/cart");
const cors = require("cors");

require("dotenv").config();
require("./config/db");
//Middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1", userRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", favouriteRoute);
app.use("/api/v1", cartRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server Started ${process.env.PORT}`);
});
