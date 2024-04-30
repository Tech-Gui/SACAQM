const express = require("express");
const mongoose = require("mongoose");
const nodeRoutes = require("./routes/nodeRoutes");
const NodeModel = require("./models/nodeSchema"); // Change to nodeModel
const cors = require("cors");

const db = require("./db");
const fs = require("fs");

const path = require("path");

// Function to save sensor data from JSON files in a folder to the database
async function saveNodeDataFromFolder(folderPath) {
  try {
    // Read the file names in the folder
    const fileNames = fs.readdirSync(folderPath);

    // Iterate over each file
    for (const fileName of fileNames) {
      // Check if the file is a JSON file
      if (path.extname(fileName) === ".json") {
        // Construct the full file path
        const filePath = path.join(folderPath, fileName);

        // Read the JSON filess
        const rawData = fs.readFileSync(filePath);
        const nodeDataArray = JSON.parse(rawData);

        // Iterate over each object in the JSON array and save it to the database
        for (const nodeDataObj of nodeDataArray) {
          // Create a new NodeData document
          const nodeDataDocument = new NodeModel(nodeDataObj); // Change to nodeModel
          // Save the document to the database
          await nodeDataDocument.save();
        }

        console.log(`Node data from file ${fileName} saved successfully`);
      }
    }

    console.log("All node data saved successfully");
  } catch (err) {
    console.error("Error saving node data:", err);
  } finally {
    // Close the MongoDB connection
    // mongoose.disconnect();
  }
}

// Create an Express app
const app = express();

// Allow requests from all origins during development
const corsOptions = {
  origin: 'https://sacaqm-frontend.onrender.com'
};

app.use(cors(corsOptions));


// Use routes
app.use("/api/sensors", nodeRoutes);

// Call the function to save sensor data
// saveNodeDataFromFile();
// saveNodeDataFromFolder("json_data");

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
