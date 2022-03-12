const srcLocation = require("../../../srcLocation");
const express = require("express");
const router = express.Router();

var bodyParser = require('body-parser')

const dbConnection = require("../../dbConnection");

router.get(`/`,(req,res)=>{
    dbConnection.query("SELECT * FROM Alunos;",(err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

router.post(`/`,(req,res)=>{

    let newAluno = req.body;
    let password = Math.random().toString(36).substring(2, 15);

    dbConnection.query(`CALL criarAluno('${newAluno.email}','${password}',${newAluno.idTurma},'${newAluno.pNome}','${newAluno.uNome}')`,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("deu certo\n"+password);
        }
  });
});



module.exports = router;