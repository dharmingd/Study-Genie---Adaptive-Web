const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    profilePicture: String,
    displayName: String,
    emailId: String,
    tags: [String],
    gender: String,
    university: String
});

mongoose.model('users', userSchema);

