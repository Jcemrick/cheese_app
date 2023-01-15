// Dependencies
require('dotenv').config();

const { PORT = 3333, DATABASE_URL } = process.env
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const morgan = require('morgan');


// Database
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on('open', () => console.log("You are connected to MongoDB!"))
    .on('close', () => console.log("You are disconnected from MongoDB!"))
    .on('error', (error) => console.log(error))


// Cheese Model 
const CheeseSchema = new mongoose.Schema ({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model('Cheese', CheeseSchema);


// Middlware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes

// Test 
app.get('/', (req, res) => {
    res.send("Server working")
});

// Create Cheese
app.post('/cheese', async (req, res) => {
    try {
        res.json(await Cheese.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update Cheese
app.put('/cheese/:id', async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, {new: true }));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete Cheese
app.delete('/cheese/:id', async (req, res) => {
    try {
        res.json(await Cheese.findByIdAndRemove(re.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Cheese Index
app.get('/cheese', async (req, res) => {
    try {
        res.json(await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});


// Listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));