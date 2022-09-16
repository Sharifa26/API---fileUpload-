const Author = require('../models/author.model.js');

//create and save a new author
exports.create = (req, res) => {
    if (!req.body) {
        res.send(400).send({
            message: "Content can not be empty!!!!"
        });
    }
    const authorss = new Author({
        author: req.body.author,
        book: req.body.book,
        description: req.body.description,
        published: req.body.published || false
    });
    Author.create(authorss, (err, data) => {
        if (err)
            res.send(500).send({
                message:
                    err.message || "some error occured while creating author.",
            });
        else res.send(data);
    });
};

//retrieve all Author from the database(with condition).
exports.findAll = (req, res) => {
    const author = req.body.author;

    Author.getAll(author, (err, data) => {
        if (err)
            res.send(500).send({
                message:
                    err.message || "some error occured while finding author.",
            });
        else res.send(data);
    });
};

//find a single author
exports.findOne = (req, res) => {
    Author.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Not_Found") {
                res.send(404).send({
                    message: `Not Found Author by Id ${req.params.id}.`
                });
            } else {
                res.send(500).send({
                    message: "Error finding Author by Id" + req.params.id,
                });
            }
        } else res.send(data);
    });
};

//find all published Author
exports.findAllPublished = (req, res) => {
    Author.getAllPublished((err, data) => {
        if (err)
            res.send(500).send({
                message:
                    err.message || "some error occured while finding published author.",
            });
        else res.send(data);
    });
};

//update a Author by id 
exports.update = (req, res) => {
    // validate Request
    if (!req.body) {
        res.send(500).send({
            message: "Content can not be Empty!!!"
        });
    }


    console.log(req.body);

    Author.updateById(req.params.id, new Author(req.body), (err, data) => {
        if (err) {
            if (err.kind === "Not_Found") {
                res.status(404).send({
                    message: `Not found Author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Author with id " + req.params.id,
                });
            }
        } else res.send(data);
    })
};

//Delete a Author by id
exports.delete = (req, res) => {
    Author.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Author with id" + req.params.id
                });
            }
        } else res.send({ message: `Author was deleted successfully!!!` });
    });
};

//Delete all Author
exports.deleteAll = (req, res) => {
    Author.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "some error occured while removing all Authors."
            });
        else res.send({ message: `All Authors were deleted successfully!!!` });
    });
};
