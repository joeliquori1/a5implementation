
const { Int32 } = require('bson');
const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const MessagesSchema = new Schema({
    english: String,
    spanish: String,
    isleft: Boolean,
    rating: Boolean,
    thumbs: Boolean,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const Messages = mongoose.model('messageposts', MessagesSchema);

module.exports = Messages;

