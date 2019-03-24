const express = require('express')
const router = express.Router()
const exercise = require('../../controllers/exercises')

// User Model
const Exercise = require('../../models/exercise')

// Get All Member Cycle
router.get('/cycles', (req, res) => {
    
})



// Get All Member Cycle Measurement Data
router.get('/cycles/measurement', (req, res) => {
    // Add Query Based on Date
})

// Get All Member Cycle Fitness Parameter Data
router.get('/cycles/fitness', (req, res) => {
    // Add Query Based on Date
})

// Query cycles and return specified Cycle(s)
router.post('/cycles/query', (req,res)=>{

})

// New Cycle Form Template
router.post('/cycle', (req,res) => {

})

// Create New Cycle
router.post('/cycle', (req,res) => {

})

// Get specific Cycle Id
router.get('/cycle/:id', (req, res) => {
    
})

// Update cycle
router.put('/cycle/:id', (req,res) => {

})

// Delete Cycle
router.delete('/cycle/:id', (req, res) =>{

})

