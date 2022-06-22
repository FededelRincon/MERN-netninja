require('dotenv').config();
const workoutRoutes = require('./routes/workouts');

const express = require('express');
const mongoose = require('mongoose');


// express app
const app = express();

// middleware
app.use( express.json() );

app.use((req, res, next) => {
    // console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes );

//  connect to db
mongoose.connect( process.env.MONGO_URI )
    .then(() => {
        // listen for request
        console.log('connect to DB - OK');
        app.listen( process.env.PORT, () => {
            console.log('Listening on port 4000!!! ')
        });
    })
    .catch((error)=>{
        console.log('connect to DB - ERROR');
        console.log(error)
    })


process.env.PORT



