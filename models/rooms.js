const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    groupImage:{ type: String },
    created_by:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('rooms', roomSchema);