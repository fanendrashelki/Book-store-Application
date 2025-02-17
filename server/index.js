const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
require("dotenv").config();
require("./config/db");
//Middleware
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", bookRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Started ${process.env.PORT}`);
});
