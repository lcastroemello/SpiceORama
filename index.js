const express = require("express");
const app = express();
const ca = require("chalk-animation");
const db = require("./sql/imagedb");
const s3 = require("./s3");
var moment = require("moment");
const config = require("./config");

app.use(express.static("./public"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// --------------------------FormData API---------------

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// ---------RENDERING MY IMAGEBOARD------------------
app.get("/myimageboard", function(req, res) {
    db.getImgInfo()
        .then(info => {
            // console.log("testing db ", info);
            res.json(info);
        })
        .catch(err => {
            console.log(err);
        });
});

// ---------------UPLOADING PICTURES----------------

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    // const name = req.body.name;
    if (req.file) {
        const url = config.s3Url + req.file.filename;
        // console.log("getting info ", req.body);
        db.insertImg(
            url,
            req.body.username,
            req.body.title,
            req.body.description
        )
            .then(info => {
                console.log("img info added to db ", info);
            })
            .then(() => {
                db.getImgInfo()
                    .then(data => {
                        // console.log("testing our info rendered on post ", data);
                        res.json(data);
                        // file: req.file.filename
                        // success: true
                    })
                    .catch(err => {
                        console.log("err in rendering", err);
                    }); //end of getting the images back to insert
            })
            .catch(err => {
                console.log("err in adding to db", err);
            });
    } else {
        res.json({
            success: false
        });
    } //end of req.file if else
}); //end of app.post

// ---------------------COMMENTS MODAL-------------

app.get("/myimageboard/:id", (req, res) => {
    const { id } = req.params;
    // console.log("getting id", id);
    db.getImgInfoById(id)
        .then(imgData => {
            let imgInfo = imgData;
            db.getCommentsByImgId(id).then(comments => {
                let finalImgInfo = [imgInfo, comments];
                finalImgInfo[0].rows[0].created_at = moment(
                    finalImgInfo[0].rows[0].created_at,
                    moment.ISO_8601
                ).format("d MMM YYYY, h:mma");
                for (var i = 0; i < finalImgInfo[1].rows.length; i++) {
                    finalImgInfo[1].rows[i].created_at = moment(
                        finalImgInfo[1].rows[i].created_at,
                        moment.ISO_8601
                    ).format("d MMM YYYY, h:mma");
                }
                res.json(finalImgInfo);
            });
        })
        .catch(err => {
            console.log("err in get myimageboard:id", err);
        });
}); // end of app.get commentmodal

app.post("/myimageboard/:id", (req, res) => {
    const { id } = req.params;
    let nId = id;
    db.insertComment(req.body.comments, req.body.username, nId)
        .then(() => {
            console.log("comment info added to db ", nId);
        })
        .then(() => {
            db.getImgInfoById(nId)
                .then(imgData => {
                    let imgInfo = imgData;
                    db.getCommentsByImgId(nId).then(comments => {
                        let finalImgInfo = [imgInfo, comments];
                        finalImgInfo[0].rows[0].created_at = moment(
                            finalImgInfo[0].rows[0].created_at,
                            moment.ISO_8601
                        ).format("d MMM YYYY, h:mma");
                        for (var i = 0; i < finalImgInfo[1].rows.length; i++) {
                            finalImgInfo[1].rows[i].created_at = moment(
                                finalImgInfo[1].rows[i].created_at,
                                moment.ISO_8601
                            ).format("d MMM YYYY, h:mma");
                        }
                        res.json(finalImgInfo);
                    });
                })
                .catch(err => {
                    console.log("err in adding to db", err);
                });
        })
        .catch(err => {
            console.log("err in adding to db", err);
        });
});

app.listen(8080, () => ca.neon("Oh, mama! Check THAT Vue!"));
