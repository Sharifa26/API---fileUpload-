module.exports = app => {
    const authorss = require("../controllers/author.controller.js");

    var router = require("express").Router();

    //create a new author
    router.post("/", authorss.create);

    //Retrive all Author
    router.get("/", authorss.findAll);

    //Retrive all Published Author
    router.get("/published", authorss.findAllPublished);

    //Retrive  a single author with id
    router.get("/:id", authorss.findOne);

    //Update a Author with id
    router.put("/:id", authorss.update);

    //Delete a Author with id
    router.delete("/:id", authorss.delete);

    //Delete All Author
    router.delete("/", authorss.deleteAll);

    app.use('/api/author', router);

};