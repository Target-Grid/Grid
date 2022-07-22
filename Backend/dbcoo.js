const mongoose = require("mongoose");

const db =
  "mongodb+srv://grid:grid@cluster0.qp9ojr0.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((e) => {
    console.log("connection Failed");
  });
