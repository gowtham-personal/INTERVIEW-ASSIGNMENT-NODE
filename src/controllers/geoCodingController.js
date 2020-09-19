const axios = require("axios");
const { API_URL_CONSTANTS } = require("../config/apiUrlConstants");

const getMethod = async url => {
  try {
    const response = await axios({
      method: "get",
      url: url
    });
    return response;
  } catch (error) {
    return error;
  }
};
// Get user by userName and password.
exports.getForwardGecoding = async (req, res) => {
  let street = `&street=${req.query.street}`;
  let state = `&state=${req.query.state}`;
  let country = `&country=${req.query.country}`;
  let postalcode = `&postalcode=${req.query.postalcode}`;

  let queryDetails = `${req.query.street ? street : ""}${
    req.query.state ? state : ""
  }${req.query.country ? country : ""}${
    req.query.postalcode ? postalcode : ""
  }`;
  if (queryDetails) {
    var forwardGeoCodingResponse = await getMethod(
      `${API_URL_CONSTANTS.FORWARD_GEOCODING_URl}?q${queryDetails}&format=geocodejson&&polygon_geojson=${req.query.polygon}`
    );
  } else {
    res.status(400).send("Bad Request");
  }
  console.log("forwardGeoCodingResponse", forwardGeoCodingResponse);
  if (forwardGeoCodingResponse.data) {
    return res.json(forwardGeoCodingResponse.data);
  } else {
    return res.status(400).send("Address Not Found");
  }
};

// Add a user to the list
exports.getRevereseGeoCoding = async (req, res) => {
  let lat = `&lat=${req.query.lat}`;
  let long = `&lon=${req.query.long}`;

  let queryDetails = `${req.query.lat ? lat : ""}${req.query.long ? long : ""}`;
  if (queryDetails) {
    var reverseGeoCodingResponse = await getMethod(
      `${API_URL_CONSTANTS.REVERSE_GEOCODING_URL}?format=geocodejson${queryDetails}`
    );
  } else {
    res.status(400).send("Bad Request");
  }
  console.log("forwardGeoCodingResponse", reverseGeoCodingResponse);
  if (reverseGeoCodingResponse.data) {
    return res.json(reverseGeoCodingResponse.data);
  } else {
    return res.status(400).send("locatiopn Not Found");
  }
};
