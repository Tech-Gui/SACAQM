const mongoose = require("mongoose");

// Define a schema for your sensor data
const NodeDataSchema = new mongoose.Schema({
  id: String,
  sensor_id: String,
  timestamp: Date,
  temperature: Number,
  humidity: Number,
  pm1p0: Number,
  pm2p5: Number,
  pm4p0: Number,
  pm10p0: Number,
  voc: Number,
  nox: Number,
  latitude: Number,
  longitude: Number,
  altitude: Number,
  area: String,
  operator: String,
  cellid: String,
});

// Create a model based on the schema
const NodeData = mongoose.model("NodeData", NodeDataSchema);

module.exports = NodeData;
