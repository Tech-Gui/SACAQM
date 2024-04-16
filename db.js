// db.js

const mongoose = require("mongoose");

// Replace '<password>' and '<dbname>' with your actual password and database name
const dbURL =
  "mongodb+srv://BroughtCargo:BroughtCargo@cluster0.lcxjdhp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
