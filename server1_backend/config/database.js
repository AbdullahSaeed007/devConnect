const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {})
    .then((con) => {
      console.log(`mongoDB connected to HOST: ${con.connection.host}`);
    })
    .catch((err) => {
      console.error("mongoDB connection error: ", err);
    });
};
module.exports = connectDatabase;
