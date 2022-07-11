const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.use(express.static("public"));
app.use(bodyParser.urlenconded({ extended: true }));
app.set("view engine", "ejs");
