const mongoose = require("mongoose");

// remove DeprecationWarning
// mongoose.set("useFindAndModify", false);

// mongoose
exports.mongoose = mongoose;

const Atlas_server = process.env.DB_CONNECT;
const Local_server = "mongodb://localhost:27017/test";
// connect mongoDB atlas
exports.mongoose
  .connect(Local_server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((Mongoose) => {
    // connect success
    if (Mongoose.connections[0].host === "localhost") {
      console.log("Mongoose is connect to localhost : 27017");
    } else console.log("Mongoose is connect to MongoDB Atlas");
    // console.log(
    //   "Mongoose is connect to ",
    //   Mongoose.connections[0].host,
    //   Mongoose.connections[0].port
    // );
  })
  .catch((err) => {
    // connect error!
    console.log(err);
  });
