const mongoose = require("mongoose");
require("dotenv").config();

const { Schema } = mongoose;

const urlPairSchema = new Schema({
  longURL: {
    type: String,
    required: true,
    maxLength: 2048 - process.env.URL_PREFIX.length,
  },
  shortURL: {
    type: String,
    required: true,
    maxLength: 22 - process.env.URL_PREFIX.length,
  },
});

urlPairSchema.index({ longURL: 1 }, { name: "long URL search index", unique: true, sparse: true });
urlPairSchema.index({ short: 1 }, { name: "short URL search index", unique: true, sparse: true });

const URLPair = mongoose.model("URLPair", urlPairSchema);

module.exports = URLPair;
