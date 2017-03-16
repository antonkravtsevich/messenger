var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/messenger_db');
var Schema = mongoose.Schema;

var Messages = new Schema({
    sender: String,
    text: String,
    date: String
});

var Messages = mongoose.model('messages', Messages);

module.exports.Messages = Messages;