// My imports
const URLPair = require("../models/URLPair");
const CustomError = require("../utils/CustomError");
const catchErrors = require("../utils/catchErrors");
const { separateUrl } = require("../utils/urlSeparator");

// GET handlers

module.exports.getMatch = catchErrors(async (req, res) => {
  const url = req.query.url;

  const { prefix, urlRest } = separateUrl(url);

  if (url.length > 22) {
    const findResult = await URLPair.findOne({ longURL: urlRest }, { _id: false, longURL: false });

    if (!findResult) {
      let generatedString = "";

      // here goes the short string generation

      res.status(200).send(prefix + generatedString);
    } else {
      res.status(200).send(prefix + findResult.shortURL);
    }
  } else {
    const findResult = await URLPair.findOne({ shortURL: urlRest }, { _id: false, shortURL: false });

    if (!findResult) {
      res.status(404).send("The requested short URL does'nt exist");
    } else {
      res.status(200).send(prefix + findResult.longURL);
    }
  }
});
