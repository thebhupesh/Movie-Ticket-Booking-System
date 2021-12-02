var mongoose = require('mongoose');

const showSchema = mongoose.Schema({
    movie:{
        type: String,
        required: true,
    },
    theatre:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Show',showSchema,'shows');