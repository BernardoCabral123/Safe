const mysql2 = require("mysql2");
require(`dotenv`).config();

const dbConnection = mysql2.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT

})

dbConnection.connect((err)=>{
    if(!err){
        console.log(`connected to DB: ${process.env.DATABASE}`);
    
    }
    else{
        console.log("problemas")
    }
});

module.exports = dbConnection;