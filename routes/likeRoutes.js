const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Like = mongoose.model("likes");
const Note = mongoose.model("notes");

module.exports = app => {
    app.post('/api/like', requireLogin ,async (req, res)=>{
        const {_note} = req.body;
        const like = await new Like({
            _user: req.user._id,
            _note
        }).save().then((like)=>{
            Note.updateOne({
                _id: _note
            },{
                $inc: {numberOfLikes: 1}
            }).then(()=>{
                res.send(like);
            })
        }).catch(e=>{
            res.status(401).send();
        });
    });

    app.put('/api/like', requireLogin ,async (req, res)=>{
        //console.log(req.body);
        const {_note} = req.body;
        //console.log(_note);
        Like.deleteOne({
            _user:req.user._id,
            _note
        }).then((like)=>{
            Note.updateOne({
                _id: _note
            },{
                $inc: {numberOfLikes: -1}
            }).then(()=>{
                res.send(like);
            })
        });
    });
};