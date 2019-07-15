const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(`postgres:postgres:postgres@localhost:5432/imageboard`);
}

//-------GETTING INFO from tables-----

exports.getImgAndTitle = function() {
    return db.query("SELECT url, title FROM images");
};
