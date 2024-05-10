const express = require("express");
const mongoose = require("mongoose");
const nodeRoutes = require("./routes/nodeRoutes");
const NodeModel = require("./models/nodeSchema"); // Changed to nodeModel
const cors = require("cors");

const db = require("./db");
const fs = require("fs");

const path = require("path");

// Create an Express app
const app = express();

// Allow requests from all origins during development
const corsOptions = {
  origin: "https://sacaqm-frontend.onrender.com",
};

app.use(cors(corsOptions));

// Use routes
app.use("/api/sensors", nodeRoutes);

// Set up HTTP server
const http = require('http');

// Create the HTTP server
const server = http.createServer(app);

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
