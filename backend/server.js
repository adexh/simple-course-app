require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./utils/mongodb_connect");
const cors = require('cors');
var cookieParser = require("cookie-parser");

var whitelist = ['http://localhost:5173']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      console.log("Not allowed by CORS");
      callback('Not allowed by CORS')
    }
  },
  credentials:true //Added this to handle CORS cookie set issue
}

app.use(cookieParser());


app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT;

connection();

const user = require("./routers/userRoute");
const Courses = require("./routers/productRoute");

/*
This is to enable pre-flight cors check accross the APIs
*/
app.options("/user/userLogin", cors(corsOptions));

//app.use("/consumer");
app.use("/user", user);
app.use("/courses", Courses);

app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.end();
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});