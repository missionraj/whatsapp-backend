const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required:true },
    email: { type: String, required:true },
    profilePic : { type: String },
    rooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'rooms' }]
});

module.exports = mongoose.model('users', userSchema);


