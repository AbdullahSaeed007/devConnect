const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const cors = require("cors");
const bodyparser = require("body-parser");
const errorMiddleware = require("./middlewares/errors");
const fileUpload = require("express-fileupload");

// Configure CORS
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from your frontend's origin
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true, // Enable cookies and credentials
//   })
// );
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

const questions = require("./routes/question");
const post = require("./routes/post");
const job = require("./routes/job");
const auth = require("./routes/auth");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");
const notification = require("./routes/notification");

// Use routes
app.use("/api/v1", questions);
app.use("/api/v1", post);
app.use("/api/v1", auth);
app.use("/api/v1", job);
app.use("/api/v1", messageRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", notification);
app.use(errorMiddleware);

module.exports = app;
