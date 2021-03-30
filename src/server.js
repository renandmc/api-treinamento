require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

require("./database");

const app = express();
app.use(helmet());
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(require("./routes"));

app.use("/img", express.static(path.resolve(__dirname, "..", "uploads")));

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`API listening on port ${port}`));