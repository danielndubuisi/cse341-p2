const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');

const port = process.env.PORT || 8080;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;

// Swagger API documentation route — enable request interception so the UI will send cookies
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            requestInterceptor: (req) => {
                // include credentials on API requests made by the docs UI
                req.credentials = 'include';
                return req;
            }
        }
    })
);

// middleware
app.use(bodyParser.json())
    .use(session({ secret: 'dncse341', resave: false, saveUninitialized: true }))
    .use(passport.initialize())
    .use(passport.session())
    .use(
        cors({
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
        })
    )
    .use('/', routes);

// Passport GitHub Strategy
passport.use(
    new githubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//index route with gitHub authentication
app.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName} <br> <a href="/api-docs">Go to API Documentation</a> <br> <a href="/logout">Logout</a>`
            : `<a href="/auth/github/login">Login with GitHub</a>`
    );
});

app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
    function (req, res) {
        // Successful authentication, update session and redirect home
        req.session.user = req.user;
        res.redirect('/');
    }
);

// catch all error handler
process.on('uncaughtException', (err, origin) => {
    console.log('Caught exception: ' + err + '\n' + 'Exception origin: ' + origin);
    process.exit(1); //mandatory (as per the Node.js docs)
});

// start the server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
