/*------------------------------------------------------------------
Common JS Includes
------------------------------------------------------------------*/
const mongoose = require('mongoose');
/*----------------------------------------
const Schema = mongoose.Schema;
Destructuring-->
-----------------------------------------*/
const { Schema } = mongoose;

/*------------------------------------------------------------------
Classes
------------------------------------------------------------------*/
/* Create a new class called Users */
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

/*------------------------------------------------------------------
Instantiate
------------------------------------------------------------------*/
/* Create a mongoose collection instance of type userSchema named users */
/* Mongoose does not overwrite existing collections */
/* Two arguments in model() LOADS into mongoose */
mongoose.model('users', userSchema);