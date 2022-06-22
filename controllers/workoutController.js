const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

//1)  get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1 });
    
    res.status(200).json( workouts );
}

//2)  get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No valid id'})
    }

    const workout = await Workout.findById(id);

    if( !workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    return res.status(200).json(workout);
}


//3)  create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    // add doc to db
    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

//4)   delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No valid id'})
    }

    const workout = await Workout.findOneAndDelete({ _id: id });//q el _id de mongo sea igual al id q yo le paso

    if( !workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    return res.status(200).json(workout);
}

//5)  update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No valid id'})
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });   //el modelo se encarga de filtrar si vienen datos extras

    if( !workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    return res.status(200).json(workout);
}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}