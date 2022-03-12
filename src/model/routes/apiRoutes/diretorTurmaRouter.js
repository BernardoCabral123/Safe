const srcLocation = require("../../../srcLocation");
const express = require("express");
const router = express.Router();

const dbConnection = require("../../dbConnection");


router.get(`/teste`,(req,res)=>{
    res.send("ware sheets");
    });

router.get(`/`,(req,res)=>{
    dbConnection.query("SELECT * FROM vistaAdministrador;",(err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

 router.post(`/`,(req,res)=>{
    
    for(let i = 0;i <req.body.length; i++){
        let password = Math.random().toString(36).substring(2, 15);

            dbConnection.query(`CALL criarAdmin('${req.body[i].email}','${password}')`,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
            }
        });
    }
    
    res.send(req.body.length + ` Admins adicionados `)
    
})

module.exports = router;