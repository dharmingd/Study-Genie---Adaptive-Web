const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    userId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    noteId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    status : {
        type : String,
        enum : ['Public, Private']
    },
    time : Date
});

mongoose.model('groups', groupSchema);
