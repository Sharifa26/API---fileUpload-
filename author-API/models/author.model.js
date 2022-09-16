const { log } = require('console');
const { title } = require('process');
const sql = require('../config/db.config.js');


//constructor 
const Author = function (authorss) {
    this.author = authorss.author;
    this.book = authorss.book;
    this.description = authorss.description;
    this.published = authorss.published;
};

//create
Author.create = (newAuthor, result) => {
    sql.query("INSERT INTO authorss SET ?", newAuthor, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        console.log("created authors:", { id: res.insertId, ...newAuthor });
        result(null, { id: res.insertId, ...newAuthor });
    });
};

//fetch by Id
Author.findById = (id, result) => {
    sql.query(`SELECT * FROM authorss WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found authorss:", res[0]);
            result(null, res[0]);
            return;
        }

        //not fount Author with the id
        result({ kind: "not_found" }, null);
    });
};

//fetch All
Author.getAll = (title, result) => {
    let query = "SELECT * FROM authorss";

    if (title) {
        query += ` WHERE title  LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("authorss:", res);
        result(null, res);
    });
};

//fetch All by Published
Author.getAllPublished = result => {
    sql.query("SELECT * FROM authorss WHERE published = true", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }

        console.log("authorss:", res);
        result(null, res);
    });
};

//update Author
Author.updateById = (id, authorss, result) => {
    sql.query(
        "UPDATE authorss SET author=?,book=?,description=?,published=? WHERE id=?",
        [authorss.author, authorss.book, authorss.description, authorss.published, id],
        (err, res) => {
            if (err) {
                console.log("error:", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                //not found Author with id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Author:", { id: id, ...authorss });
            result(null, { id: id, ...authorss });
        }
    );
};


//Delete One By Id
Author.remove = (id, result) => {
    sql.query("DELETE FROM authorss WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            //not found Author with id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Author with id:", id);
        result(null, res);
    });
};

//Delete All
Author.removeAll = result => {
    sql.query("DELETE FROM authorss", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} authorss`);
        result(null, res);
    });
};

module.exports = Author;