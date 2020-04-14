const fetch = require('node-fetch');

/*
 ** Calls an api that returns json.
 */
const fetchURL = async (url, responseHandler) => {
  const response = await (await fetch(url)).json();
  return responseHandler(response);
};

module.exports = fetchURL;
