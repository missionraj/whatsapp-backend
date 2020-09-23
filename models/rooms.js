const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,    
    users: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    messages: {type: mongoose.Schema.Types.ObjectId, ref: 'messages' },
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('rooms', roomSchema);