require("dotenv").config();

module.exports.separateUrl = (url) => {
  let prefix = "",
    urlRest = "";

  // set the prefix length given the url length (if short check the env variable for short prefix, or for long the same)
  let prefixLength = url.length > 22 ? process.env.LONG_URL_PREFIX.length : process.env.SHORT_URL_PREFIX.length;

  // if no env variable for this given length (long or short) fixed url then check the separation point
  // of the url (the last '/')
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
