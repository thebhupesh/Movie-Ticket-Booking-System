var mongoose = require('mongoose');

const timingSchema = mongoose.Schema({
    slot:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Timing',timingSchema,'timings');