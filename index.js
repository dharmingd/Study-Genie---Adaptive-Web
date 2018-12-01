const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

require("./models/User");
require("./models/Note");
require("./models/Group");
require("./models/Like");
require("./models/Favorite");
require("./services/passport");

mongoose.connect(keys.mongodbURI);
const app = express();


app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/noteRoutes")(app);
require("./routes/groupRoutes")(app);
require("./routes/likeRoutes")(app);
require("./routes/favoriteRoutes")(app);

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);