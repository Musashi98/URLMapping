const randomstring = require("randomstring");
const URLPair = require("../models/URLPair");

module.exports.generateString = async () => {
  let result = "";

  // infinite bucle to search a non used random string
  while (true) {
    result = randomstring.generate(11);

    const findResult = await URLPair.findOne(
      { shortURL: result },
      { _id: false, longURL: false, generationDate: false }
    );

    if (!findResult) break;
  }

  return result;
};
