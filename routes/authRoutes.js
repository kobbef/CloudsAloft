//PassportJS NPM module
const passport = require("passport");

//App.Get()-> Route Handler
//Get()->Watch for incoming HTTP requests with a given method (Get,Post,Put,Delete,Patch)
// '/' -> The route  http://localhost:5000'/' (root)
// 'req' -> Javascript request object
// 'res' -> Response object
//  res.send() -> Send back an immediate JSON object

/* app.get('/',(req,res) => {
    res.send({hi:'there'});
}); */

//We don't have access to app from index.js here, so create
// a function and pass 'app' into it so we have access to it
module.exports = (app) => {
  /* Handle our authentication request path */
  app.get(
    "/auth/google", //route path
    passport.authenticate(
      "google", //strategy
      {
        scope: ["profile", "email"], //Ask google for this information
      }
    )
  );

  /* Handle our authentication callback path */
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      //Redirect
      res.redirect("/surveys");
    }
  );

  /* Logout Handler */
  app.get("/api/logout", (req, res) => {
    /*Passport will destroy the cookie*/
    req.logout();
    res.redirect("/");
  });

  /* Handle a successful authentication */
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
