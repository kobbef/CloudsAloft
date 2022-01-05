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
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

/*------------------------------------------------------------------
Export for use in Survey.js
------------------------------------------------------------------*/
module.exports = recipientSchema;