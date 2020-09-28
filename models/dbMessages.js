const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    message:String,
    timestamp:{ type: Date, default: Date.now },
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'rooms' },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    name: String
});

module.exports = mongoose.model('messagecontents', messagesSchema);