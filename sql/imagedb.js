const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(`postgres:postgres:postgres@localhost:5432/imageboard`);
}

// -------INSERTING INFO in tables---

exports.insertImg = function(url, username, title, description) {
    return db.query(
        "INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)",
        [url, username, title, description]
    );
};

exports.insertComment = function(comment, username, img_id) {
    return db.query(
        "INSERT INTO comments (comment, username, img_id) VALUES ($1, $2, $3)",
        [comment, username, img_id]
    );
};

//-------GETTING INFO from tables-----

exports.getImgInfo = function() {
    return db.query("SELECT * FROM images ORDER BY id DESC");
};

exports.getImgInfoById = function(id) {
    return db.query("SELECT * FROM images WHERE id=$1", [id]);
};

exports.getCommentsByImgId = function(img_id) {
    return db.query("SELECT * FROM comments WHERE img_id=$1", [img_id]);
};
