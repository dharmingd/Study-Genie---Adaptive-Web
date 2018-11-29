const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
    app.post('/api/user/details',(req, res)=>{
        console.log(req.body);
        const { gender, university, tags } = req.body;
        User.findOneAndUpdate({
            googleId: req.user.googleId
        },{
            gender,
            university,
            tags
        }).then(()=>{
            res.send({"success": true});
        }).catch(()=>{
            res.status(400).send();
        });
    });

    app.get('/api/users', async (req, res)=>{
       const users = await User.find({}).select({_id:1, emailId:1});
       res.send(users);
    });
};