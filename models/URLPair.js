const mongoose = require("mongoose");
require("dotenv").config();

const { Schema } = mongoose;

// Schema

const urlPairSchema = new Schema({
  longURL: {
    type: String,
    required: true,
    maxLength: 2048 - process.env.LONG_URL_PREFIX.length,
  },
  shortURL: {
    type: String,
    required: true,
    maxLength: 22 - process.env.SHORT_URL_PREFIX.length,
  },
  generationDate: {
    type: Date,
    required: true,
    expires: process.env.SHORT_URL_EXPIRATION_TIME,
  },
});

// Indexes for speed up queries, since these are Single Field Indexes the queries
// will be done in log(n) with n being the current document count (mongoDB uses a B-Tree for
// searching in Single Field Indexes)

urlPairSchema.index(
  { generationDate: 1 },
  { name: "document expiration time index", expireAfterSeconds: process.env.SHORT_URL_EXPIRATION_TIME }
);
urlPairSchema.index({ longURL: 1 }, { name: "long URL search index", unique: true, sparse: true });
urlPairSchema.index({ short: 1 }, { name: "short URL search index", unique: true, sparse: true });

const URLPair = mongoose.model("URLPair", urlPairSchema);

module.exports = URLPair;
