// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId; 
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const multer = require('multer');

// Model imports
const User = require('./models/user');
const Movie = require('./models/movies');
const Theatre = require('./models/theatres');
const Show = require('./models/shows');
const Timing = require('./models/timings');

// Database configuration import
const confiq = require('./config/config').get(process.env.NODE_ENV);

// Create app and add dependencies
const app = express();
// Dependencies
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(confiq.DATABASE,{useNewUrlParser: true, useUnifiedTopology:true},function(err) {
    if(err) console.log(err);
    console.log("Database is connected.");
});

// User management functions:
// Register api
app.post('/api/register',function(req,res) {
    const newuser = new User(req.body);
    if(newuser.password != newuser.password2) return res.status(400).json({success: false, message: "Passwords do not match"});
    User.findOne({email: newuser.email},function(err,user) {
        if(user) return res.status(400).json({success : false, message :"Email already exits"});
        newuser.save((err,doc) => {
            if(err) return res.status(400).json({success : false, message :"Could not register"});
            res.status(200).json({success: true, message: "Resistered successfully"});
        });
    });
});

// Login api
app.post('/api/login',function(req,res) {
    User.findOne({'email': req.body.email},function(err,user) {
        if(!user) return res.json({success: false, message: 'Invalid email address'});
        user.comparepassword(req.body.password,(err,isMatch) => {
            if(!isMatch) return res.json({success: false, message: 'Incorrect credentials'});
            const token = jwt.sign({auth: true, name: user.name, email: user.email},confiq.SECRET);
            return res.json({success: true, message: token, user: user.type});
        });
    });
});

// Active user profile api
app.get('/api/profile',function(req,res) {
    let token = req.headers['x-access-token'];
    if(token) {
        const data = jwt.verify(token, confiq.SECRET);
        return res.json(data);
    }
    else return res.json({auth: false});
});

// Create operations:
// Add movie api
// File location and name contraints
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'YOUR UPLOADS FOLDER LOCATION');
    },
    filename: function(req, file, cb) {   
        cb(null, file.originalname);
    }
});

// File type constraint
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Adding file constraints
let upload = multer({ storage, fileFilter });

// api
app.post('/api/addmovie',upload.single('poster'),function(req,res) {
    const name = req.body.name;
    const indate = req.body.indate;
    const outdate = req.body.outdate;
    const genre = req.body.genre;
    const duration = req.body.duration;
    const imdb = req.body.imdb;
    const director = req.body.director;
    const poster = req.file.filename;
    const trailer = req.body.trailer;
    const newMovieData = {
        name,
        indate,
        outdate,
        genre,
        duration,
        imdb,
        director,
        poster,
        trailer
    }
    const newMovie = new Movie(newMovieData);
    newMovie.save()
        .then(() => {
            res.json({success: true, message: 'Movie added successfully'}
        )}).catch(err => {
            res.status(400).json({success: false, message: err})
        });
});

// Add theatre api
app.post('/api/addtheatre',function(req,res) {
    const newtheatre = new Theatre(req.body);
    newtheatre.save((err,doc) => {
        if(err) {
            return res.status(400).json({ success : false, message :"Could not create theatre"});
        }
        res.status(200).json({
            success: true,
            message : "Theatre created successfully"
        });
    });
});

// Add show api
app.post('/api/addshow',function(req,res) {
    const newshow = new Show(req.body);
    Show.findOne({theatre: req.body.theatre, time: req.body.time, date: req.body.date}, {}, (err, result) => {
        if(err) {
            res.json({success:false, message: "Error"})
        }
        if(result) {
            res.json({success:false, message: "Time slot in use."})
        } else {
            newshow.save((err,doc) => {
                if(err) {
                    return res.status(400).json({ success : false, message :"Could not add show"});
                }
                res.status(200).json({
                    success: true,
                    message : "Show created successfully"
                });
            });
        }
    });

});

// Data read operations:
// Read movie posters
app.get('/api/getposters',function(req,res) {
    Movie.find({}, {}, (err, result) => {
        if(err) {
            res.json({message: err})
        } else {
            res.json(result)
        }
    });
});

// Read single movie data by _id attribute
app.post('/api/getmovie',function(req,res) {
    const id = req.body.id;
    Movie.findById(id, (err, result) => {
        if(err) {
            res.json({message: err})
        } else {
            res.json(result)
        }
    });
});

// Read data for form select fields
app.get('/api/getformdata',function(req,res) {
    var movies, theatres, timings
    Movie.find({}, {name: 1, indate: 1, outdate: 1}, (err, result) => {
        if(err) {
            movies = err
        }
        else {
            movies = result
            Theatre.find({}, {name: 1}, (err, result) => {
                if(err) {
                    theatres = err
                } else {
                    theatres = result
                    Timing.find({}, {slot: 1}, (err, result) => {
                        if(err) {
                            timings = err
                        } else {
                            timings = result
                            res.json({movie: movies, theatre: theatres, timing: timings})
                        }
                    });
                }
            });
        }
    });
});

// Read shows
app.post('/api/getshows',function(req,res) {
    Show.find({movie: req.body.id, date: req.body.date}, (err, result) => {
        if(err) {
            res.json({message: err})
        } else {
            res.json(result)
        }
    });
});

// Start server
const PORT = 1337;
app.listen(PORT,() => {
    console.log(`App is live at ${PORT}.`);
});
