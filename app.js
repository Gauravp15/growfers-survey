const express = require("express");
require('dotenv').config();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3030;

const ENDPOINT = "https://script.google.com/a/macros/redcrackle.com/s/AKfycby44jXjTzc8BUHM0w8c5F8hp5DURm1OG9wi0HLV5mrAGfwooojoybx2YUtRoEGiSXjg/exec";

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.post("/", (req, res) => {
    let request = req.body;
    console.log("Req", req.body);
    axios
    .post(`${ENDPOINT}?role=${request.role === "other" ? request["role-Comment"] : request.role}`, request)
    .then(async resp => {
        if(resp.status === 200){
            let data = resp.data;
            console.log("Data", data);
            res.status(200).send("Data captured");
        }
    }).catch(e => {
        console.log("Error", e)
    });
});


app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`));