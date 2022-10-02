const randomstring = require("randomstring");
const URLPair = require("../models/URLPair");

module.exports.generateString = async () => {
  let result = "";
  while (true) {
    result = randomstring.generate(11);

    const findResult = await URLPair.findOne({ shortURL: result }, { _id: false, longURL: false });

    if (!findResult) break;
  }

  return result;
};
