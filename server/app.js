// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');

// Create an instance of express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1', // Default region
});

// Initialize DynamoDB DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

app.post('/api/groups', (req, res) => {
    const { groupId, groupName, 
        description,
        groupType,
        privacy,
        location,
        maxMembers } = req.body; // Get data from request body
    
  
    // Validate input
    if (!groupId || !groupName) {
      return res.status(400).json({ message: 'groupId and groupName are required' });
    }
  
    // Prepare the parameters for DynamoDB
    const params = {
      TableName: 'EventIQGroups',
      Item: {
        groupId: groupId, // Unique identifier for the group
        groupName: groupName, // Name of the group
        description: description,
        groupType: groupType,
        privacy: privacy,
        location: location,
        maxMembers: maxMembers
      },
    };
  
    // Call DynamoDB to add the item
    docClient.put(params, (err, data) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
        return res.status(500).json({ error: 'Could not add item to DynamoDB' });
      } else {
        console.log('Added item:', JSON.stringify(params.Item, null, 2)); // Log the added item
        return res.status(201).json({
          message: 'Group added successfully',
          group: params.Item, // Return the newly added group item
        });
      }
    });
  });
  

// New GET route to fetch items from the correct table name
app.get('/api/groups', (req, res) => {
    const params = {
        TableName: 'EventIQGroups', // Updated table name
    };

    docClient.scan(params, (err, data) => {
        if (err) {
            console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
            return res.status(500).json({ error: 'Could not retrieve items from DynamoDB' });
        } else {
            console.log('Scan succeeded:', JSON.stringify(data, null, 2));
            return res.status(200).json(data.Items);
        }
    });
});

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5001; // Default to port 5001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
