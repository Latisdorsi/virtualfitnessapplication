const express = require('express')
const router = express.Router()

const user = require('../controllers/users')
const auth = require('../../config/auth')

// Get request for a list of user data and display them with pagination Route
// receives URL parameters role and page number Route outputs paginated list of
// data based on role
router.get('/list/:role', user.listUser)

// List All Inactive Members
router.get('/list/member/inactive', user.listInactiveUsers);

// Post Request for Account Creation Form Creates New User Account
router.post('/create', user.registerUser)

// Returns view for account with specific ID
router.get('/detail/:id', user.readUser)

// Update User Contact Details
router.put('/detail/:id/main', user.updateUserMainDetails);

// Update User Contact Details
router.put('/detail/:id/contact', user.updateUserContactDetails);

// Update Emergency Details
router.put('/detail/:id/emergency', user.updateUserEmergencyDetails);

// Activate User
router.put('/activate/:id', user.activateUser);

// Deactivate User
router.put('/deactivate/:id', user.deactivateUser);

// Activate User Cycle
router.put('/cycle/activate/:id', user.activateUserCycle);

// Deactivate User Cycle
router.put('/cycle/deactivate/:id', user.deactivateUserCycle);

// Update User Avatar
router.put('/detail/:id/avatar', user.updateUserAvatar);

//Delete User Avatar
router.delete('/detail/:id/avatar', user.deleteUserAvatar);

// Authenticate User
router.post('/authenticate', user.authenticateUser);

// Authenticate User Token
router.get('/checkToken', auth, user.checkUserToken)

// Updates Account Data in the Database
router.put('/detail/:id', user.updateUser)
router.post('/detail/:id', user.updateUser)

// Deletes Account Data in the Database
router.delete('/detail/:id', user.deleteUser);
router.get('/delete/:id', user.deleteUser);

//Update Account Email
router.put('/change/email/:id', user.changeEmail);

// Update Account Password
router.put('/change/password/:id', user.changePassword);

// Get User Flag States
router.get('/detail/:id/flags', user.getUserFlags);

module.exports = router
