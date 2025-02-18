const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const favouriteRoute = require("./routes/favourite");

require("dotenv").config();
require("./config/db");
//Middleware
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", favouriteRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Started ${process.env.PORT}`);
});
