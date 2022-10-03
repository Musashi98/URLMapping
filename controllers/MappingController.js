// My imports
const URLPair = require("../models/URLPair");
const catchErrors = require("../utils/catchErrors");
const { separateUrl } = require("../utils/urlSeparator");
const { generateString } = require("../utils/stringGenerator");

// GET handlers

module.exports.getShort = catchErrors(async (req, res) => {
  const url = req.query.url;

  if (!url) res.status(404).send("No url to process provided");

  const { prefix, urlRest } = separateUrl(url);

  const findResult = await URLPair.findOne({ longURL: urlRest }, { _id: false, longURL: false, generationDate: false });

  if (!findResult) res.status(404).send("No short match exist yet for the provided long url");
  else res.status(200).send(prefix + findResult.shortURL);
});

module.exports.getLong = catchErrors(async (req, res) => {
  const url = req.query.url;

  if (!url) res.status(404).send("No url to process provided");

  const { prefix, urlRest } = separateUrl(url);

  const findResult = await URLPair.findOne(
    { shortURL: urlRest },
    { _id: false, shortURL: false, generationDate: false }
  );

  if (!findResult) {
    res.status(404).send("No long match exist for the provided short url");
  } else {
    res.status(200).send(prefix + findResult.longURL);
  }
});

// POST handlers

module.exports.generateShort = catchErrors(async (req, res) => {
  const url = req.query.url;

  if (!url) res.status(404).send("No url to process provided");

  const { prefix, urlRest } = separateUrl(url);

  const findResult = await URLPair.findOne({ longURL: urlRest }, { _id: false, longURL: false, generationDate: false });

  if (findResult) {
    res.status(404).send("There is already an existing short version of that url");
    return;
  }

  const generatedString = await generateString();

  const newPair = new URLPair({
    longURL: urlRest,
    shortURL: generatedString,
    generationDate: new Date(),
  });

  await newPair.save();

  res.status(201).send(prefix + generatedString);
});
