const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//handle Uncaught exception error
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("shutting down due to uncaught exception error");
  process.exit(1);
});

//setting up config file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

//cloudinary

//setting up cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// handle unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
