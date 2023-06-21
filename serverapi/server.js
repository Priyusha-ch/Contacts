
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017/contactdb'; // Update with your MongoDB connection URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection;

const connect = async () => {
  try {
    await client.connect();
    const db = client.db('contactdb'); // Update with your database name
    collection = db.collection('contacts');
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};


app.get('/api/contacts', async (req, res) => {
  try {
    const { page, limit } = req.query; // Get page number and limit from query parameters
    const skipCount = (page - 1) * limit; // Calculate the number of documents to skip based on the page and limit

    const contacts = await collection.find()
      .skip(skipCount)
      .limit(Number(limit))
      .toArray();

    res.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contact = req.body;
    const result = await collection.insertOne(contact);
    res.status(201).json(result.insertedId);
  } catch (error) {
    console.error('Failed to add contact:', error);
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body;
    const result = await collection.updateOne({ id: id }, { $set: updatedContact });
    res.json(result.modifiedCount);
  } catch (error) {
    console.error('Failed to update contact:', error);
    res.status(500).json({ error: error });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await collection.deleteOne({ id: id  });
    res.json(result.deletedCount);
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

const port = 3006; // Update with your desired port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connect();
});