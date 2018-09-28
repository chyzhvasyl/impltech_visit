let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date:     { type: Date, default: Date.now },
  message:  { type: String },
  user:     { type: Schema.Types.ObjectId, ref: 'user' }
});


const message = mongoose.model('message', MessageSchema, 'message');
module.exports = message;
/*
later we needs to add a line for "photo"
*/
