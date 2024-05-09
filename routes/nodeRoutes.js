// routes/nodeRoutes.js
const express = require("express");
const router = express.Router();
const nodeController = require("../controllers/nodeController");

// Define routes
router.get("/temperature", nodeController.getTemperature);

// Route to get all sensor data
router.get("/all", nodeController.getAllSensorData);

// Route to get all sensor data
router.get("/", nodeController.saveDummyData);

module.exports = router;
