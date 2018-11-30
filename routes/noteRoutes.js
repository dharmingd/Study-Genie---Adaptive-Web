const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const Note = mongoose.model("notes");
const Group = mongoose.model("groups");
const Like = mongoose.model("likes");
const Favorite = mongoose.model("favorites");

module.exports = app => {
  app.post("/api/note", requireLogin, async (req, res) => {
    const { title, content, category, status, _groups, tags } = req.body;
    const note = await new Note({
      _user: req.user._id,
      title,
      content,
      category,
      status,
      _groups,
      tags
    })
      .save()
      .then(note => {
        Group.updateMany(
          {
            $or: _groups.map(group => {
              return { _id: group };
            })
          },
          { $push: { _note: note._id } }
        )
          .then(() => {
            note["isLiked"] = "false";
              note["isFavorite"] = "false";
            res.send(note);
          })
          .catch(e => {
            if (_groups.length === 0) {
              note["isLiked"] = "false";
              note["isFavorite"] = "false";
              res.send(note);
            } else {
              res.status(422).send(e);
            }
          });
      })
      .catch(e => {
        res.status(422).send(e);
      });
  });

  app.put('/api/post', requireLogin, (req, res)=>{
     const { title, content, _id } = req.body;
     Note.findOneAndUpdate({
         _id,
         _user: req.user._id
     }, {
       title,
         content
     }, { new: true }).then((note)=>{
       res.send(note);
     }).catch(e=>{
       res.status(422).send(e);
     })

  });


  app.put("/api/post/update/group", requireLogin, (req, res) => {
    const { _groups, _id } = req.body;
    console.log(_id);
    Note.updateOne(
      {
        _id
      },
      {
        $push: { _groups }
      }
    ).then(() => {
      Group.updateMany(
        {
          $or: _groups.map(group => {
            return { _id: group };
          })
        },
        { $push: { _note: _id } }
      )
        .then(() => {
          res.send({ success: true });
        })
        .catch(e => {
          if (_groups.length === 0) {
            res.send({ success: true });
          } else {
            res.status(422).send(e);
          }
        });
    });
  });

  app.get("/api/note/public", requireLogin,async (req, res) => {
    const notes = await Note.find(
      {
        status: "Public"
      },
      [],
      {
        sort: {
          timeStamp: -1
        }
      }
    )
      .then(async notes => {
        const newNotes = notes.map(async note => {
          let newNote = { ...note._doc };
          const like = await Like.find({
            _user: req.user._id,
            _note: note._id
          });
          if (like.length === 0) {
            newNote["isLiked"] = "false";
          } else {
            newNote["isLiked"] = "true";
          }
          const favorite = await Favorite.find({
            _user: req.user._id,
            _note: note._id
          });
          if (favorite.length === 0) {
            newNote["isFavorite"] = "false";
          } else {
            newNote["isFavorite"] = "true";
          }

          return newNote;
        });
        const newNoteArray = await Promise.all(newNotes);
        res.send(newNoteArray);
      })
      .catch(e => {
        res.status(401).send();
      });
  });
    app.get("/api/note/own", requireLogin,async (req, res) => {
        const notes = await Note.find(
            {
                _user: req.user._id
            },
            [],
            {
                sort: {
                    timeStamp: -1
                }
            }
        )
            .then(async notes => {
                const newNotes = notes.map(async note => {
                    let newNote = { ...note._doc };
                    const like = await Like.find({
                        _user: req.user._id,
                        _note: note._id
                    });
                    if (like.length === 0) {
                        newNote["isLiked"] = "false";
                    } else {
                        newNote["isLiked"] = "true";
                    }
                    const favorite = await Favorite.find({
                        _user: req.user._id,
                        _note: note._id
                    });
                    if (favorite.length === 0) {
                        newNote["isFavorite"] = "false";
                    } else {
                        newNote["isFavorite"] = "true";
                    }

                    return newNote;
                });
                const newNoteArray = await Promise.all(newNotes);
                res.send(newNoteArray);
            })
            .catch(e => {
                res.status(401).send();
            });
    });

    app.get("/api/note/saved",requireLogin,async (req, res) => {
        const notes = await Favorite.find(
            {
                _user: req.user._id,
            }
        ).populate('_note').select("-_id -_user +_note")
            .then(async notes => {
                const newNotes = notes.map(async note => {
                    let temp = { ...note._doc };
                    let newNote = {...temp._note._doc};

                    const like = await Like.find({
                        _user: req.user._id,
                        _note: newNote._id
                    });
                    if (like.length === 0) {
                        newNote["isLiked"] = "false";
                    } else {
                        newNote["isLiked"] = "true";
                    }
                    newNote["isFavorite"] = "true";
                    return newNote;
                });
                const newNoteArray = await Promise.all(newNotes);
                res.send(newNoteArray);
            })
            .catch(e => {
                console.log(e);
                res.status(401).send();
            });
    });
};
