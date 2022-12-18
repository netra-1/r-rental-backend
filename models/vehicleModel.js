const mongoose = require("mongoose");
const Room = new mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  room_name: {
    type: String,
  },
  room_image: {
    type: String,
  },
  room_company: {
    type: String,
  },
  room_desc: {
    type: String,
  },
  room_rich_desc: {
    type: String,
  },
  is_featured: {
    type: Boolean,
  },
  booking_cost: {
    type: String,
  },
  room_sku: {
    type: String,
  },
  room_category: {
    type: String,
  },
});
module.exports = mongoose.model("Room", Room);


