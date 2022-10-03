// My imports
const URLPair = require("../models/URLPair");
const catchErrors = require("../utils/catchErrors");
const { separateUrl } = require("../utils/urlSeparator");
const { generateString } = require("../utils/stringGenerator");

// GET handlers

module.exports.getMatch = catchErrors(async (req, res) => {
  // get the url from a query variable named 'url'
  const url = req.query.url;

  if (!url) res.status(404).send("No url to process provided");

  const { prefix, urlRest } = separateUrl(url);

  if (url.length > 22) {
    // if the query url is large check if there is a pair in the database with that
    // url, if not create it
    const findResult = await URLPair.findOne(
      { longURL: urlRest },
      { _id: false, longURL: false, generationDate: false }
    );

    if (!findResult) {
      const generatedString = await generateString();

      const newPair = new URLPair({
        longURL: urlRest,
        shortURL: generatedString,
        generationDate: new Date(),
      });

      const result = await newPair.save();

      res.status(200).send(prefix + generatedString);
    } else {
      res.status(200).send(prefix + findResult.shortURL);
    }
  } else {
    // if the query url is short find the document that containst it and returns that document
    // long url, if it is nor found send an error
    const findResult = await URLPair.findOne(
      { shortURL: urlRest },
      { _id: false, shortURL: false, generationDate: false }
    );

    if (!findResult) {
      res.status(404).send("The requested short URL does'nt exist in the database");
    } else {
      res.status(200).send(prefix + findResult.longURL);
    }
  }
});
