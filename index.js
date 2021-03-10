var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = "ACfae86413d74b00b4797d9890ffdcec86";
var API_KEY_SID = "SK0b361ea05ff189087222a030efe5e3c7";
var API_KEY_SECRET = "0yrKpcOoB8lgbFfRNbLnz3L4mVB5JhLz";



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("The is up and running")
}
);

app.post("/jwt", (req, res) => {



  console.log(req.body);

  // Create an Access Token
  var accessToken = new AccessToken(
    ACCOUNT_SID,
    API_KEY_SID,
    API_KEY_SECRET
  );

  // Set the Identity of this token
  accessToken.identity = req.body.identity;

  // Grant access to Video
  var grant = new VideoGrant();
  grant.room = req.body.room;
  accessToken.addGrant(grant);

  // Serialize the token as a JWT
  var jwt = accessToken.toJwt();
  console.log(jwt);
  var body = JSON.stringify({
    token: jwt
  })
  res.send(body);

});


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));