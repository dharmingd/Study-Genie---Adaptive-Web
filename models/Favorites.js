const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    _userId: {type: Schema.Types.ObjectId, ref : 'users'},
    _noteId: {type: Schema.Types.ObjectId, ref : 'notes'},
    timeStamp: {type: Date, default: Date.now}

});

mongoose.model('likes', likesSchema);