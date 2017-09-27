const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  description: {type: String },
  img: {type: String },
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;