/*------------------------------------------------------------------
Common JS Includes
------------------------------------------------------------------*/
const express = require("express"); //Bring in express for route handling
require("./models/user"); //Bring in the Mongoose model classes
require("./models/Survey");
require("./services/passport"); //We don't need anything out of this file, just add require()
const bodyParser = require("body-parser");

/* Database Management */
const mongoose = require("mongoose");

/* Private Keys */
const keys = require("./config/keys");

/* Cookie Management */
const cookieSession = require("cookie-session");
const passport = require("passport");

/*----------------------------------------
Connect mongoose to MongoDB using the
stored key
-----------------------------------------*/
mongoose.connect(keys.mongoURI);

/*----------------------------------------
Generate Express application
This will listen to a port and route HTTP 
requests to the correct handler
-----------------------------------------*/
const app = express();

/*----------------------------------------
Express Middleware Installations
-----------------------------------------*/
/* Convert incoming POST request data bodies into JSON */
app.use(express.json());

/*Setup cookie management within Express */
app.use(
  cookieSession({
    /*Configuration */
    maxAge: 30 * 24 * 60 * 60 * 1000, //milliseconds (30 days)
    keys: [keys.cookieKey], //Used to encrypt our cookies
  })
);

/* Tell passport to make use of cookies to handle authentication */
app.use(passport.initialize());
app.use(passport.session());

/*----------------------------------------
Attach authentication route handlers

NOTE: We can shortcut this:
    const authRoutes = require( './routes/authRoutes');
    authRoutes(app);
With this:
    require( './routes/authRoutes')(app);
-----------------------------------------*/
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/weatherRoutes")(app);
require("./routes/airportRoutes")(app);

if (process.env.NODE_ENV === "production") {
  /*----------------------------------------
    Express will serve up production assets
    like our main.js file, or main.css file if
    the route is not handled by the server
    -----------------------------------------*/
  app.use(express.static("client/build"));

  /*----------------------------------------
    If not handled by the previous line ( 
    no matching file in client/build)..

    Express will serve up the index.html file
    if it doesn't recognize the route
    -----------------------------------------*/
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//http://localhost:5000/
//Heroku will inject run-time environment variable for port number
//If we are developing locally, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
