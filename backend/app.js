const express = require("express");
const router = require("./router");
const morgan = require("morgan");

const cors = require("cors");

//imports here

//code here

// Initialize our server
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
//To access the data user inputs in form.
app.use(express.urlencoded({ extended: false }));
//just a bolierplate code, tells our express server to add the user submitted data to request object.
app.use(express.json());

app.use(express.static("public"));
app.use(morgan("dev"));
app.use("/", router);

// Allow requests from localhost:3000
// app.use(cors());

module.exports = app;
