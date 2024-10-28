// server/controllers/eventController.js

const dynamoDB = require('../config/dynamoDB');

// GET all events
exports.getAllEvents = async (req, res) => {
  const params = {
    TableName: 'EventIQGroups',  // Replace with your DynamoDB table name
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Could not retrieve events' });
  }
};

// POST a new event
exports.createEvent = async (req, res) => {
  const { id, title, date, description } = req.body;

  const params = {
    TableName: 'EventIQGroups',  // Replace with your DynamoDB table name
    Item: {
      id,  // DynamoDB requires a unique id
      title,
      date,
      description,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Could not create event' });
  }
};
