const express = require('express')
const router = express.Router()

// User Model
const Exercise = require('../../models/exercise')
const Cycle = require('../../models/cycle')

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
router.post('/cycle/:id', (req,res) => {
    const userId = req.params.id
    const {targetDate, targetGoal} = req.body
    const newCycle= new Cycle( {
        userId,
        targetDate,
        targetGoal 
    })

    newCycle.save()
    .then(cycle =>{
        res.json(cycle)
    })
    .catch(error =>{
        res.send(error)
    })
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

module.exports = router
