require("dotenv").config();

module.exports.separateUrl = (url) => {
  let prefixLength = process.env.URL_PREFIX.length;

  let prefix = "",
    urlRest = "";

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
