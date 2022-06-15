require('dotenv').config()

const express = require('express');


// express app
const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.get('/', (req, res, next) => {
    res.json({msg: 'Welcome to the app'})
});

// listen for request
app.listen( process.env.PORT, () => {
    console.log('Listening on port 4000!!! ')
});

process.env.PORT



