const mongoose = require("mongoose");

const Favourite = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
});

module.exports = mongoose.model("Favourite", Favourite);


