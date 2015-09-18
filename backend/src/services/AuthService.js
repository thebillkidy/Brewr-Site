var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var tokenSecret = process.env.tokenSecret || 'TqSn6Y@Pr@3TFq*f6_7&f@*+V!$766hnfcY#Njz=A=K-_yhF_PjPJAYLxBCK%_As';

var EXPIRES_IN_MINUTES = 60*24,
    SECRET = tokenSecret,
    ISSUER = 'localhost',//TODO: change to brewr.io
    AUDIENCE = 'localhost',//TODO: change to brewr.io
    ALGORITHM = 'HS256';

module.exports = {

    expiresInMinutes: EXPIRES_IN_MINUTES,
    secret: SECRET,
    algorithm: ALGORITHM,

    hashPassword: function (password) {
        return bcrypt.hashSync(password);
    },

    comparePassword: function(password, user) {
        return bcrypt.compareSync(password, user.password);
    },
    createToken: function(user) {
        return jwt.sign({
                user: user.toJSON()
            },
            SECRET,
            {
                algorithm: ALGORITHM,
                expiresInMinutes: EXPIRES_IN_MINUTES,
                //issuer: sails.config.jwtSettings.issuer,
                //audience: sails.config.jwtSettings.audience
            })
    },

    createReply: function(user) {
        return {
            token: this.createToken(user),
            user: user
        }
    },

    validateLogin: function(request, decodedToken, callback) {
        if(!decodedToken) {
            return callback(error, false, decodedToken);
        }

        request.payload.user = decodedToken;
        server.expose('request', request);
        return callback(error, true, decodedToken);
    }
};
