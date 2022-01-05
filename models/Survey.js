/*------------------------------------------------------------------
Common JS Includes
------------------------------------------------------------------*/
const mongoose = require('mongoose');
/* Recipient subdocument collection schema */
const RecipientSchema = require('./Recipient');

/*----------------------------------------
const Schema = mongoose.Schema;
Destructuring-->
-----------------------------------------*/
const { Schema } = mongoose;

/*------------------------------------------------------------------
Classes
------------------------------------------------------------------*/
/* Create a new class called Users */
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { 
        type: Schema.Types.ObjectId, //ID of the user who owns this record
        ref: 'User' //Reference ID begins to User collection
        },
    dateSent: Date,
    lastResponded: Date
});

/*------------------------------------------------------------------
Instantiate
------------------------------------------------------------------*/
mongoose.model('surveys', surveySchema);