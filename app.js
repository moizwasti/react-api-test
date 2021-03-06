const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const User = require('./server/models').User;
const cors = require('cors');

// Set up the express app
const app = express();

app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Establish session
app.use(session({
    secret: 'My session secret',
    resave: false,
    saveUninitialized: false,
    name: 'sessionid',
    cookie: {
        path: '/api/accounts'
    }
}));

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.uuid);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        where: {
            uuid: id
        }
    })
        .then(user => done(null, user))
        .catch(error => done(error, null))
});


//Connect to database
const models = require("./server/models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database: ', process.env.DB_NAME);
})
    .catch(err => {
        console.error('Unable to connect to SQL database: ', process.env.DB_NAME, err);
    });

// Prevent against Express specific attacks
app.disable('x-powered-by');

app.disable('etag');

app.use(function (req, res, next) {
    res.setHeader('Vary', 'Accept, Cookie');
    next();
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to Films API.',
}));

module.exports = app;