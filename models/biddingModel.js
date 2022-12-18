const mongoose = require("mongoose");

const Bidding = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Bidding", Bidding);




