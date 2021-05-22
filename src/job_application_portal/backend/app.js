const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

var UserRouter = require("./routes/User");

app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://dass40:dass40@cluster0.zpnxr.mongodb.net/dass40db?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use("/user", UserRouter);

app.listen(5000, () => {
  console.log("express server started");
});
