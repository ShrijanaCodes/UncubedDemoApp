const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const bodyParser = require("body-parser");
const config = require("./config");

// Generate a JWT token to authenticate and make Zoom API calls
const payload = {
  iss: config.ZOOM_API_KEY,
  exp: new Date().getTime() + 5000
};
const token = jwt.sign(payload, config.ZOOM_API_SECRET);
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("Power your app with Webhooks!");
});

// Set up a webhook listener for your the Event - in this case we are listening to Meeting Ended event but you can add any events of your choice.
app.post("/", bodyParser.raw({ type: "application/json" }), (req, res) => {
  console.log("Hello");
  let event;

  try {
    event = JSON.parse(req.body);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Check to see if you received the event or not.
  console.log(event);
  if (req.headers.authorization === config.VERIFICATION_TOKEN) {
    res.status(200).send();

    console.log("Meeting Ended Webhook Recieved.");

    var uuid = event.payload.object.uuid;
    //Double encode the uuid for validation incase it contains slashes
    var euuid = encodeURIComponent(encodeURIComponent(uuid));
    // After receiving the event, call Past Meetings API and get the num of participants.
    var options = {
      uri: "https://api.zoom.us/v2/past_meetings/" + euuid,
      auth: {
        bearer: token
      },
      headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json"
      },
      json: true
    };

    rp(options)
      .then(function(response) {
        var totalParticipants = response.participants_count;
        return totalParticipants;
      })
      .then(function(totalParticipants) {
        console.log("Total number of participants: ", totalParticipants);
      })

      .catch(function(err) {
        // API call failed...
        console.log("API call failed, reason ", err);
      });
  } else {
    res.status(403).end("Access forbidden");
    console.log("Invalid Post Request.");
  }
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000.");
});
