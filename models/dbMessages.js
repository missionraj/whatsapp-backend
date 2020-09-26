const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    recieved : Boolean,
    room: [{type: mongoose.Schema.Types.ObjectId, ref: 'rooms' }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('messagecontents', messagesSchema);