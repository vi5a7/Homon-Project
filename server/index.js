const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const rooms = require("./routes/api/rooms");
app.use("/api/rooms", rooms);

const apartments = require("./routes/api/apartments");
app.use("/api/apartments", apartments);

const port = process.env.PORT || 5000;

//handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  //handle single page
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

app.listen(port, () => console.log(`Server started on port ${5000}`));
