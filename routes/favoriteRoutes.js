const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Favorite = mongoose.model("favorites");
const Note = mongoose.model("notes");

module.exports = app => {
    app.post('/api/favorite', requireLogin ,async (req, res)=>{
        const {_note} = req.body;
        const favorite = await new Favorite({
            _user: req.user._id,
            _note
        }).save().then((favorite)=>{
           res.send(favorite);
        }).catch(e=>{
            res.status(401).send();
        });
    });

    app.put('/api/favorite', requireLogin ,async (req, res)=>{
        //console.log(req.body);
        const {_note} = req.body;
        //console.log(_note);
        Favorite.deleteOne({
            _user:req.user._id,
            _note
        }).then((favorite)=>{
            res.send(favorite);
        });
    });
};