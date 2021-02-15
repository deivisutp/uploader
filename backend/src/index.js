require('dotenv').config;

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

/**
 * Database setup
 */
mongoose.connect(process.env.MONGO_URL, {
    userNewUrlParser: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/files', express.static(path.resolve(__dirname, "..", "tmp")))
app.use(require("./routes"));

app.listen(3000);