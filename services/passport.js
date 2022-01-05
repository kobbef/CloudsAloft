const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
//Include it this way to prevent the model from being included multiple times in a test env
//A single argument to model() pulls a schema/model out of mongoose
const User = mongoose.model('users');


/*********************************************************************
*
*   PROCEDURE NAME:
*       serializeUser
* 
*
*   DESCRIPTION:
*
*********************************************************************/
passport.serializeUser( 
    (
    user, /* User Model returned from promise */ 
    done  /* Done callback from Passport */
    ) => { 

/* user.id != profile.id: It is the UUID from MongoDB */
done( null, user.id );

}); /* serializeUser() */

/*********************************************************************
*
*   PROCEDURE NAME:
*       deserializeUser
* 
*
*   DESCRIPTION:
*       Convert an identifier into a MongoDB instance
*
*********************************************************************/
passport.deserializeUser( 
    (
    id, /* User Model returned from promise */ 
    done  /* Done callback from Passport */
    ) => 
{ 
/* Search database for this identifier */
User.findById( id )
        .then( user => {
            done( null, user ); //Send to callback with user model
        });

}); /* serializeUser() */


//GoogleStrategy( Configuration Object with keys )
//Passport.Use() - Tell library to be 'aware' of some strategy I want to use
passport.use( new GoogleStrategy( 
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', //This is our callback route, set in our Google API registration too
    proxy: true //Trust the Heroku proxy (https:// -> http://)
    }, 
    //This function will be called after the user is authenticated and we received profile data
    async (accessToken, refreshToken, profile, done )=>{ 
        /*Try to first find one record that matches this profile ID */
        const existingUser = await User.findOne( { googleId: profile.id } )
        /* We will receive a promise of type User */
        if(existingUser)
            {
            //A record already exists
            /* Call done() to tell PassportJS that we are finished
            Null -> No Error */
            done( null, existingUser );
            }
        else
            {
            /* .save() stores this instance into MongoDB */
            const user = await new User( { googleId: profile.id } ).save()
            /* Once we received the saved user back from the DB, call done */
            done( null, user );
            }
        } 
    ) 
);