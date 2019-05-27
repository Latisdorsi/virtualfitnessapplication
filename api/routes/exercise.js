const express = require('express');
const router = express.Router();

const exercise = require('../controllers/exercise');

// List List All Exercises
router.get('/list', exercise.listExercises);

// Select Name of All Existing Exercises
router.get('/names', exercise.listExerciseNames);

// Create New Exercise
router.post('/create', exercise.createExercise);

// Read Exercise
router.get('/detail/:id', exercise.readExercises);

// Update Exercise
router.put('/detail/:id', exercise.updateExercise);

//Update Exercise Image
router.put('/detail/:id/image', exercise.updateExerciseImage);

// Delete Exercise
router.delete('/detail/:id', exercise.deleteExercise)

module.exports = router