const express = require('express');
const router = express.Router();
const users  = require('../controllers/users');
const rooms = require('../controllers/room');
const messages =  require('../controllers/messages');

// find the user if already registerd or not
router.route('/checkuser').post(users.checkUser);

//register user in db
router.route('/registerUser').post(users.registerUser);

// create new group
router.route('/newgroup').post(rooms.newGroup);

// get rooms 
router.route('/getRooms').get(rooms.getRooms);

// get message sync 
router.route('/message/sync').get(messages.getMessages);

// create new messages
router.route('/messages/new').post(messages.createNewMessage);



module.exports = router;