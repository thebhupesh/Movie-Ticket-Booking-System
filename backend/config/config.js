const config = {
    default : {
        SECRET: 'YOUR SECRET CODE',
        DATABASE: 'YOUR DATABASE URI'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}
