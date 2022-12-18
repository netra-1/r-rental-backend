const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb://127.0.0.1:27017/r-rental_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
