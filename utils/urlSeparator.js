require("dotenv").config();

module.exports.separateUrl = (url) => {
  let prefix = "",
    urlRest = "";

  let prefixLength = url.length > 22 ? process.env.LONG_URL_PREFIX.length : process.env.SHORT_URL_PREFIX.length;

  if (prefixLength == 0) {
    for (let i = url.length - 1; i >= 0; i--) {
      if (url[i] == "/") {
        prefixLength = i + 1;
        break;
      }
    }
  }

  prefix = url.slice(0, prefixLength);
  urlRest = url.slice(prefixLength);

  return { prefix, urlRest };
};
