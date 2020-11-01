const mongoose = require("mongoose");
const config = require("config").mongo;


let dbURI = `mongodb://${config.user}:${encodeURIComponent(config.password)}@${config.hostString}/${config.db}?replicaSet=${config.replicaSet}`

mongoose.connect(dbURI);

mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + dbURI);
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

