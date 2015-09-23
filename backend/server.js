'use strict';

var Hapi = require('hapi');
var http = require('http');
var https = require('https');
var config = require('./config');
var Promise = require('bluebird');

// Set max sockets to be open
http.globalAgent.maxSockets = Number.MAX_VALUE;
https.globalAgent.maxSockets = Number.MAX_VALUE;

// Create server
var server = new Hapi.Server({ debug: { request: ['error'] } });

server.connection({
    host: config.server.ip,
    port: config.server.port,
    routes: {
        cors: {
            origin: config.server.cors_client_origins,
            headers: config.server.cors_headers,
            methods: config.server.cors_methods,
            credentials: config.server.cors_credentials
        }
    }
});

function start () {
    var self = this;
    return new Promise(function (resolve, reject) {
        registerPlugins()
        .then(function () {
            return startServer();
        })
        .then(function () {
            return resolve(server);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
}

function startServer() {
    return new Promise(function (resolve, reject) {
        server.start(function () {
            return resolve();
        });
    });
}

function registerPlugins() {

    return new Promise(function (resolve, reject) {
        server.register([
            {
                register: require('hapi-auth-bearer-simple'),
                options: {}
            }
        ], function (err) {
            if (err) {
                return reject(err);
            }

            // register fixtures
            loadFixtures();
            registerStrategy(server);
            registerRoutes(server);

            return resolve();

        });
    });
}

function loadFixtures() {

    var knex = require('knex')({client: 'postgresql', connection: {
        host: config.database.connection.host,
        user: config.database.connection.user,
        password: config.database.connection.password,
        database: "postgres"
    }});

    knex.raw("DROP DATABASE brewr")
        .then(function(){
            return knex.raw("CREATE DATABASE brewr");
        })
        .finally(function(){
            knex.destroy();

            var sqlFixtures  = require('sql-fixtures');
            var fixturesSpec = require('./test/fixtures/fixtures.json');

            var dbConfig = {
                client: 'pg',
                connection: config.database.connection
            };
            sqlFixtures.create(dbConfig, fixturesSpec, function(err, result){
                if(err) console.log(err);
                console.log("Seed complete!");
            });
        });
}
// Register the authentication strategies
function registerStrategy(server) {
    var AuthService = require('./src/services/AuthService.js');

    // Register the strategy
    server.auth.strategy('bearer', 'bearerAuth', {
        validateFunction: validateFunction
    });
}

// Register all the routes
function registerRoutes(server) {
    var routes = require('require-all')(__dirname + '/src/routes/v1');

    Object.keys(routes).forEach(function (key) {
        server.route(routes[key]);
    });
}

// For now we do validate here until I got a good way to use the models everywhere
function validateFunction (token, callback) {
    if (!token) {
        return callback('E_NO_TOKEN');
    }

    var UserSession = require('./src/db/models/UserSession');
    var User = require('./src/db/models/User');

    UserSession
    .forge({ token: token })
    .fetch()
    .then(function (userSession) {
        if (!userSession) {
            return Promise.reject('E_INVALID_TOKEN');
        }

        return User.forge({ id: userSession.get('id') }).fetch();
    })
    .then(function (user) {
        if (!user) {
            return Promise.reject('E_INVALID_TOKEN');
        }

        // Set scope object for hapi authenticator,
        // needed since we can not access attributes instantly
        user.scope = user.get('scope');

        return callback(null, true, user);
    })
    .catch(function (err) {
        return callback(err);
    })
}

// Register routes
module.exports = {
    start: start,
    server: server
};
