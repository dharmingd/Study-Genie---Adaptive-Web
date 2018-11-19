const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    _user : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    _note : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'notes'
    }],
    status : {
        type : String,
        enum : ['Public, Private']
    },
    timeStamp : {type: Date, default: Date.now}
});

mongoose.model('groups', groupSchema);
