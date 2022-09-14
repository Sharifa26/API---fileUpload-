const express = require('express');
const cors = require("cors");
const app = express();


global.__basedir = __dirname;

var corsOptions = {
    origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8001;
app.listen(port, () => {
    console.log(`server is running on ${port}....`);
})