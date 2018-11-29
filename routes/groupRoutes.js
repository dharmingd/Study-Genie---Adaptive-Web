const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Group = mongoose.model("groups");

module.exports = app => {

    app.get('/api/group', requireLogin , async (req, res)=>{
       const groups = await Group.find({
            $or: [
                {
                    _user: req.user._id
                },{
                    _owner: req.user._id
                }
            ]
       }).then((groups)=>{
           res.send({groups});
       }).catch((e)=>{
           console.log(e);
           res.status(422).send(e);
       });
    });

    app.post('/api/group', requireLogin ,async (req, res)=>{
        console.log(req.body);
        const { groupName, _user, status } = req.body;
        const group = await new Group({
            _owner: req.user._id,
            _user,
            groupName,
            status
        }).save().then((group)=>{
            console.log(group);
            res.send({group});
        }).catch((e)=>{
            console.log(e);
            res.status(422).send(e);
        });
    });
};