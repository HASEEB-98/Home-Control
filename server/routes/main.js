const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const deviceStatusController = require('../controllers/deviceStatusController');
const deviceControlController = require('../controllers/deviceControlController');
const deviceDeleteController = require('../controllers/deviceDeleteController');
const deviceAddController = require('../controllers/deviceAddController');
const aboutUs = require('../controllers/aboutUs');


// Home Page Route

// Purpose: Display the home page to user
// Input: None
// Output: Link to ejs file containing home page
router.get('/', deviceController.home);


// Add Device Routes

// Purpose: Display add device page to user
// Input: None
// Output: Link to ejs file containing add device page
router.get('/add', deviceAddController.home)

// Purpose: POST Method to add the device in system (database)
// Input: Information about the device and its features, For eg: if device type is Floor Heating it will take info like Device Name, Device Type, Status, Location, Actual Temperature, Requested Temperature
// Output: Link to ejs file containing device status page along with the message that device added successfuly
router.post('/add/addDevice', deviceAddController.addDevice)


// Device Status Routes

// Purpose: Display all the devices (name, type) in the system along with the link to display the feature of each device seprately
// Input: None
// Output: Link to ejs file containing device status page along with all devices information
router.get('/status', deviceStatusController.home);

// Purpose: Display all the devices (name, type) which matches(containg) with the search term in the system along with the link to display the feature of each device seprately
// Input: Input value seatch by user
// Output: Link to ejs file containing device status page along with all devices information matches(containg) with the search term
router.post('/status', deviceStatusController.find);

// Purpose: Display the complete detail (information about all the feature) of a device selected by user
// Input: Device ID
// Output: Link to ejs file containing device feature information of particular device selected by user
router.get('/status/view/:id', deviceStatusController.viewDevice);


// Control Device Routes

// Purpose: Display all the devices (name, type) in the system along with the link to edit/control each device seprately
// Input: None
// Output: Link to ejs file containing control device page along with all devices information
router.get('/control', deviceControlController.home);

// Purpose: Display all the devices (name, type) which matches(containg) with the search term in the system along with the link to edit/control each device seprately
// Input: Input value seatch by user
// Output: Link to ejs file containing control device page along with all devices information matches(containg) with the search term
router.post('/control', deviceControlController.find);

// Purpose: Display page to user all feature of respective device which is editable
// Input: Device ID
// Output: Link to ejs file containing edit device page along with all feature of particular device
router.get('/control/edit/:id', deviceControlController.edit);

// Purpose: Save the changes made by user to existing device in the system
// Input: Information about the device and its features irrespective whether user has changed it or not
// Output: Link to ejs file containing device status page along with the message that device updated successfuly
router.post('/control/edit/saveEdit', deviceControlController.saveEdit);


// Delete Device Routes

// Purpose: Display all the devices (name, type) in the system along with the link to delete selected device 
// Input: None
// Output: Link to ejs file containing delete device page along with all devices information
router.get('/delete', deviceDeleteController.home);

// Purpose: Display all the devices (name, type) which matches(containg) with the search term in the system along with the link to delete selected device 
// Input: Input value seatch by user
// Output: Link to ejs file containing delete device page along with all devices information matches(containg) with the search term
router.post('/delete', deviceDeleteController.find);

// Purpose: Delete the selected device from the system
// Input: Device ID
// Output: Link to delete device page along with message that current device is deleted successfully
router.get('/delete/deviceDelete/:id', deviceDeleteController.deleteDevice);


// About Page Route

// Purpose: Display the about page to user
// Input: None
// Output: Link to ejs file containing about page
router.get('/about', aboutUs.about);

module.exports = router;