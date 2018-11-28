const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Note = mongoose.model("notes");
const Group = mongoose.model("groups");

module.exports = app => {
    app.post('/api/note', requireLogin ,async (req, res)=>{
        const { title, content, category, status, _groups, tags } = req.body;
        const note = await new Note({
            _user: req.user._id,
            title, content, category, status, _groups, tags
        }).save().then((note)=>{
            Group.updateMany({$or: _groups.map((group) => {
                return {_id: group}
                })}, { $push: { _note: note._id }}).then(()=>{
                res.send({success: true});
            }).catch((e)=>{
                if(_groups.length===0){
                    res.send({success: true});
                }else{
                    res.status(422).send(e);
                }
            });
        }).catch((e)=>{
            res.status(422).send(e);
        });
    });

    app.get('/api/note/public', async (req, res)=>{
        const notes = await Note.find({
            status: 'Public'
        },[], {
            sort:{
                timeStamp: -1
            }
        }).then((notes)=>{
            res.send(notes);
        }).catch(e=>{
            res.status(401).send();
        });
    });

};