const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/images"));
app.use(morgan("tiny"));
require("dotenv").config();
// Importing DB Connection
require("./db_connection/dbconnection");

//Importing Router // Modules are already in routes
const userRouter = require("./router/userRouter");
const roomRouter = require("./router/roomRouter");
const categoryRouter = require("./router/categoryRouter");
const favouriteRouter = require("./router/favouriteRouter");
const articleRouter = require("./router/articleRouter");
const bookingRouter = require("./router/bookingRouter");
const reviewRouter = require("./router/reviewRouter");
app.use(userRouter);
app.use(roomRouter);
app.use(categoryRouter);
app.use(favouriteRouter);
app.use(articleRouter);
app.use(bookingRouter);
app.use(reviewRouter);

app.listen(process.env.PORT || 90);

module.exports = app;
