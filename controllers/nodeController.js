// controllers/nodeController.js
const NodeData = require("../models/nodeSchema");

// Controller logic to get all sensor data
exports.getAllSensorData = async (req, res) => {
  try {
    // Query the database to get all sensor data
    const allSensorData = await NodeData.find();

    // Send the data as JSON response
    res.json(allSensorData);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Controller logic
exports.getTemperature = async (req, res) => {
  try {
    // Implement logic to fetch temperature data from the database
    const temperatureData = await NodeData.find()
      .select("timestamp temperature")
      // .limit(10)
      .sort("-timestamp");

    // Send the temperature data as JSON response
    res.json(temperatureData);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.saveNodeData = async (req, res) => {
  try {
    // Extract sensor data from request body
    const {
      id,
      sensor_id,
      timestamp,
      temperature,
      humidity,
      pm1p0,
      pm2p5,
      pm4p0,
      pm10p0,
      voc,
      nox,
      latitude,
      longitude,
      altitude,
      area,
      operator,
      cellid,
    } = req.body;

    // Create a new NodeData document
    const NodeData = new NodeData({
      id,
      sensor_id,
      timestamp,
      temperature,
      humidity,
      pm1p0,
      pm2p5,
      pm4p0,
      pm10p0,
      voc,
      nox,
      latitude,
      longitude,
      altitude,
      area,
      operator,
      cellid,
    });

    // Save the document to the database
    await NodeData.save();

    // Send a success response
    res.status(201).json({ message: "Sensor data saved successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Controller logic to save sensor data
exports.saveDummyData = async (req, res) => {
  try {
    // Extract temperature data from request query
    const temperature = req.query.temp;
    console.log(temperature)

    // Create a new NodeData document with dummy values for other parameters
    const nodeData = new NodeData({
      // Assigning dummy values for other parameters
      id: "dummy_id",
      sensor_id: "dummy_sensor_id",
      timestamp: new Date(),
      temperature: parseFloat(temperature), // Assign temperature from query, parsed as a float
      humidity: 50, // Example value for humidity, assuming it's a percentage
      pm1p0: 10, // Example value for pm1p0, assuming it's in micrograms per cubic meter
      pm2p5: 20, // Example value for pm2p5, assuming it's in micrograms per cubic meter
      pm4p0: 30, // Example value for pm4p0, assuming it's in micrograms per cubic meter
      pm10p0: 40, // Example value for pm10p0, assuming it's in micrograms per cubic meter
      voc: 5, // Example value for voc, assuming it's in parts per billion (ppb)
      nox: 10, // Example value for nox, assuming it's in parts per billion (ppb)
      latitude: 40.7128, // Example value for latitude, assuming it's in decimal degrees
      longitude: -74.0060, // Example value for longitude, assuming it's in decimal degrees
      altitude: 10, // Example value for altitude, assuming it's in meters
      area: "dummy_area",
      operator: "dummy_operator",
      cellid: "dummy_cellid",
    });
    

    // Save the document to the database
    await nodeData.save();

    // Send a success response
    res.status(201).json({ message: "Sensor data saved successfully" });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};