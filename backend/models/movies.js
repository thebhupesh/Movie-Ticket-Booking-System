var mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    indate:{
        type: String,
        required: true,
    },
    outdate:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    imdb:{
        type: String,
        required: true,
    },
    director:{
        type: String,
        required: true,
    },
    poster:{
        type: String,
        required: true,
    },
    trailer:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Movie',movieSchema,'movies');