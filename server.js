// Dependencies 
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const cheesesRouter = require('./controllers/cheeses');
const PORT = process.env.PORT ?? 3333

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/cheeses', cheesesRouter)

// Routes
app.get('/', (req, res) => {
    res.send("Server serving")
});

// Listener
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
});