let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  mail: {type: String },
  message: [{ type: Schema.Types.ObjectId, ref: 'message'}]
});


const user = mongoose.model('user', UserSchema, 'user');
module.exports = user;
/*
later we needs to add a line for "photo"
*/
