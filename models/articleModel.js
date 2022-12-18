const mongoose = require("mongoose");
const Article = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rich_description: {
    type: String,
    required: true,
  },
  is_featured: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Article", Article);
