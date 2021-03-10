const express = require("express")
const bodyParser = require("body-parser")
require('dotenv').config();
var cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Server is running")
})

app.post("/test", (req, res) => {
    console.log(req.body)
    res.send(201)
})



app.listen(3000, () => console.log(`Server running on port: 3000`));