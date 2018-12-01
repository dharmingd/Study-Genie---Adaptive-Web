const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, ref : 'users'},
    _note: {type: Schema.Types.ObjectId, ref : 'notes'},
    timeStamp: {type: Date, default: Date.now}
});

mongoose.model('likes', likesSchema);