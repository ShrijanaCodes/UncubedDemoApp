const dotenv = require("dotenv").config();
module.exports = {
  ZOOM_API_KEY: process.env.APIKey,
  ZOOM_API_SECRET: process.env.APISecret,
  VERIFICATION_TOKEN: process.env.VerificationToken
};
