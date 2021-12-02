var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    password2:{
        type:String,
        required: true,
        minlength:8

    },
    type:{
        type:String,
        required: true,
        maxlength: 5,
        default: 'user'
    }
});

// function to hash password with salt
userSchema.pre('save',function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(salt,function(err,salt) {
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash) {
                if(err) return next(err);
                user.password = hash;
                user.password2 = hash;
                next();
            })
        })
    }
    else{
        next();
    }
});

// function to compare passwords
userSchema.methods.comparepassword = function(password,cb) {
    bcrypt.compare(password,this.password,function(err,isMatch) {
        if(err) return cb(next);
        cb(null,isMatch);
    });
}

module.exports = mongoose.model('User',userSchema,'users');