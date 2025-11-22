const express = require("express");
const app = express();
const mongodb = require("./data/database");
const route = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const MongoDBStore = require("connect-mongodb-session")(session);

const port = process.env.PORT || 3000;

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secretCode',
        resave: false,
        saveUninitialized: true,
        store: store
    }))
    // this is a basic express session
    .use(passport.initialize())
    //init passport on every route
    .use(passport.session())
    //allow passport to use express sessions
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Headers',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}))
    .use(cors({origin: '*'}))
    .use("/", route);

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
        callbackURL: process.env.CALLBACK_URL
        },
      function(accessToken, refreshToken, profile, done) {
        // In a real application, you would save the user info to your database here
        return done(null, profile);
      }
    ));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});    

app.get("/", (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out, visit 'https://music-practice-log.onrender.com/login' to Login."); });

app.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect : "/api-docs", session: false}), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});

//catch uncaught exceptions globally
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port ${port}`)
        });
    }
});

