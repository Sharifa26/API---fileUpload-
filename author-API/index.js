const express = require('express');
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8011"
};

app.use(cors(corsOptions));

app.use(express.json());

//const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));

app.get('/', (res,req)=>{
    res.json({
        message: "welcome to my application !!!!!!"
    });
});

require("./author-API/routes/author.routers.js")(app);

const PORT = process.env.PORT || 8011;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}....`);
})