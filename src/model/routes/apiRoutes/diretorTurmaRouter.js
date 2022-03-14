const srcLocation = require("../../../srcLocation");
const express = require("express");
const router = express.Router();

const dbConnection = require("../../dbConnection");



router.get(`/turmas`,(req,res)=>{
    dbConnection.query("SELECT * FROM vistaTurma WHERE idConta = ? ORDER BY turma",
    [req.user.idConta],
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(422).send("Erro na recolha de turmas");
        }
        else{
            res.json(result);
        }
    })
});

router.get(`/formandos`,(req,res)=>{
    console.log(req.user.idConta)
    dbConnection.query("SELECT vistaFormando.nome,vistaFormando.email,vistaFormando.turma FROM vistaTurma,vistaFormando Where vistaFormando.idTurma = vistaTurma.idTurma AND vistaTurma.idConta = ?",
    [req.user.idConta],
    (err,result)=>{
        if(err){
            console.log(tessse)
            console.log(err);
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

router.get(`/formandos/:idTurma`,(req,res)=>{
    dbConnection.query("SELECT * FROM vistaFormando WHERE idTurma = ?",[req.params.idTurma],(err,result)=>{
        if(err){
            console.log(err);
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

module.exports = router;