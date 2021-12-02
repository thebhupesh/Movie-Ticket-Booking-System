var mongoose = require('mongoose');

const theatreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    seats:{
        type: Number,
        required: true,
        default: 1
    }
});

module.exports = mongoose.model('Theatre',theatreSchema,'theatre');