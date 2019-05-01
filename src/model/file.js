const mongoose = require('mongoose');

var fileData = new mongoose.Schema({
    contentType: String,
    image: Buffer
});

module.exports = mongoose.model('quotes', fileData);