const express = require("express");
const app = express();
const ca = require("chalk-animation");
const db = require("./sql/imagedb.js");

app.use(express.static("./public"));

// ------redirecting----------
// app.get("/", (req, res) => {
//     res.redirect("/myimageboard");
// });

// ---------MY IMAGEBOARD--------
app.get("/myimageboard", function(req, res) {
    db.getImgAndTitle()
        .then(info => {
            console.log("testing db ", info);
            res.json(info);
        })
        .catch(err => {
            console.log(err);
        });

    // res.json();
});

app.listen(8080, () => ca.neon("Oh, mama! Check THAT Vue!"));
