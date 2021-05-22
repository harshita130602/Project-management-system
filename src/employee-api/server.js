const express = require("express");

const app = express();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

var EmployeeRouter = require("./routes/Employee");

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/dass40", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error during DB connection", err));

app.use("/employees", EmployeeRouter);

app.listen(4000, () => {
  console.log("Started Express Server");
});
