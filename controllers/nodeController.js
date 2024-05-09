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
      temperature: temperature, // Assign temperature from query
      humidity: "dummy_humidity",
      pm1p0: "dummy_pm1p0",
      pm2p5: "dummy_pm2p5",
      pm4p0: "dummy_pm4p0",
      pm10p0: "dummy_pm10p0",
      voc: "dummy_voc",
      nox: "dummy_nox",
      latitude: "dummy_latitude",
      longitude: "dummy_longitude",
      altitude: "dummy_altitude",
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