const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieValidator = require("./cookieValidator");
const moment = require("moment");
const mongoose = require("mongoose");
cors = require("cors");

let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let dbUrl =
  "mongodb+srv://Nodeapp001:UBjeOcV3vxBhVpKK@cluster0.ybgft.mongodb.net/?retryWrites=true&w=majority";
let Message = mongoose.model("Message", {
  name: String,
  message: String,
  time: String,
  timeStamp: Date,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(cors);

app.use(cookieParser());

app.use(validateCookies);

const userRoute = require("./routes/users");
app.use("/users", userRoute);

const messagesRoute = require("./routes/messages");
const { sendStatus } = require("express/lib/response");
app.use("/messages", messagesRoute);

messagesRoute.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    let thisMsg = {
      message: req.body.message,
      name: req.body.name,
      time: moment().format("HH:mm a"),
      timeStamp: moment(),
    };

    var message = new Message(thisMsg);
    message.save((err) => {
      if (err) sendStatus(500);

      io.emit("message", thisMsg);
      //res.json(thisMsg);
    });
  } else {
    res
      .json({
        message: req.body.message,
        name: req.body.name,
      })
      .sendStatus(400);
  }
});

messagesRoute.get("/", (req, res) => {
  Message.find({}, (err, messages) => {
    res.json(messages);
  });
});

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

io.on("connection", (socket) => {
  console.log("User is connected");
});

mongoose.connect(dbUrl, (err) => {
  console.log("mongo db connection ", err);
});

var server = http.listen("3000", () => {
  console.info("Server is listening on port ", server.address().port);
});

// var messages = [
//   { name: "kyle", message: "Message 001", time: "3:22 pm" },
//   { name: "Sally", message: "Message 002", time: "3:23 pm" },
// ];
