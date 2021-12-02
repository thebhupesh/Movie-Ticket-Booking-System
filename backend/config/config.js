const config = {
    default : {
        SECRET: 'iamironman',
        DATABASE: 'mongodb://localhost:27017/movie_ticket'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}