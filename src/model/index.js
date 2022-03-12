const srcLocation = require("../srcLocation");

const cors = require("cors");
const express = require(`express`);
const dbConnection = require("./dbconnection");
const bcryptjs = require("bcryptjs");
const app = express();
require(`dotenv`).config();
app.use(cors());

app.options('*', cors());
app.use((req, res, callback) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language, Location');
res.header('Access-Control-Expose-Headers', 'Authorization, Language, Location');
    return callback();
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

const port = process.env.SERVERPORT || 3030;

console.log(Math.random().toString(36).substring(2, 15)); // gerador de passe

app.use("/",require("./routes/mainRouter"));

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});