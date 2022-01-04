//Common JS includes
const express = require('express');

//Generate Express application
//This will listen to a port and route HTTP requests to the correct handler
const app = express();

//App.Get()-> Route Handler
//Get()->Watch for incoming HTTP requests with a given method (Get,Post,Put,Delete,Patch)
// '/' -> The route  http://localhost:5000'/' (root)
// 'req' -> Javascript request object
// 'res' -> Response object
//  res.send() -> Send back an immediate JSON object

app.get('/',(req,res) => {
    res.send({hi:'there'});
});

//http://localhost:5000/
//Heroku will inject run-time environment variable for port number
//If we are developing locally, use port 5000
const PORT = process.env.PORT || 5000;
app.listen(5000);




