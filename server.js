const express = require("express")
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse reques of content-type - aplication/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models")

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db')
//     initial()
// })
db.sequelize.sync()

// simple first route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my first node application" })
})
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// function initial() {
//     Role.create({
//         id: 1,
//         name: "user"
//     });

//     Role.create({
//         id: 2,
//         name: "moderator"
//     });

//     Role.create({
//         id: 3,
//         name: "admin"
//     });
// }