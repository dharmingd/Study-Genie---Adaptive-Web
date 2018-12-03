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
        let users = [];
        users.push(_user);
        users.push(req.user._id);
        const group = await new Group({
            _owner: req.user._id,
            _user: users,
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

    app.get('/api/group/public' , requireLogin,async (req, res)=>{
        const groups = await Group.find({
            status:"Public"
        }).populate('_owner').then((groups)=>{
            res.send(groups);
        }).catch((e)=>{
            console.log(e);
            res.status(422).send(e);
        });
    });

    app.post('/api/group/one' , requireLogin, async (req, res)=>{
        const {_id} = req.body;
        const groups = await Group.findOne({
            $or: [{
                _id,
                status:"Public"
            },{
                _id,
                status:"Private",
                _owner: req.user._id
            },{
                _id,
                status: "Private",
                _user: req.user._id
            }]
        }).populate('_owner _note _user').then((groups)=>{
            res.send(groups);
        }).catch((e)=>{
            console.log(e);
            res.status(422).send(e);
        });
    });

    app.post('/api/group/join', requireLogin ,(req, res)=>{
        console.log(req.body);
        const {_id} = req.body;
        Group.findOneAndUpdate({
            status: 'Public',
            _id
        },{
            $push: { _user: req.user._id }
        }, { new: true }).then((group)=>{
            res.send(group);
        }).catch((e)=>{
            console.log(e);
            res.status(422).send(e);
        });
    })

    app.post('/api/group/leave', requireLogin ,(req, res)=>{
        console.log(req.body);
        const {_id} = req.body;
        Group.findOneAndUpdate({
            status: 'Public',
            _id
        },{
            $pull: { _user: req.user._id }
        }, { new: true }).then((group)=>{
            res.send(group);
        }).catch((e)=>{
            console.log(e);
            res.status(422).send(e);
        });
    })

    app.get('/api/group/my' , requireLogin, async (req, res)=>{
        const {_id} = req.user;
        console.log(_id);
        const groups = await Group.find({
            _user :_id
        }).populate('_owner').then((groups)=>{
            console.log(groups);
            res.send(groups);
        }).catch((e)=>{
            console.log(e);
            res.status(422).send(e);
        });
    });

    app.put('/api/group/delete',requireLogin, (req, res)=>{
        const {_id} = req.body;
        console.log(_id);
        Group.findOneAndDelete({
            _id,
            _owner: req.user._id
        }).then((group)=>{
            res.send(group);
        }).catch((e)=>{
            res.status(401).send();
        })
    })

};