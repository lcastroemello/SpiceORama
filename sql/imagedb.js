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

//-------GETTING INFO from tables-----

exports.getImgAndTitle = function() {
    return db.query("SELECT url, title FROM images");
};
