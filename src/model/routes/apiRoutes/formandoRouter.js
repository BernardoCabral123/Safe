const express = require("express");
const router = express.Router();

const dbConnection = require("../../dbConnection");

router.get(`/ofertas/deferidas`,(req,res)=>{
    dbConnection.query("SELECT * FROM vistaOferta WHERE idConta = ?",
    [req.user.idConta],
    (err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

router.get(`/ofertas/aprovadas`,(req,res)=>{
    dbConnection.query("SELECT * FROM vistaOferta WHERE idConta = ?",
    [req.user.idConta],
    (err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

router.get(`/ofertas`,(req,res)=>{
    dbConnection.query("SELECT idArea FROM contaArea WHERE idConta = ?",
    [req.user.idConta],
    (err,resultt)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na busca das ofertas");
        }
        else{
            dbConnection.query("SELECT * FROM vistaOferta WHERE idArea = ? AND finalizado = 0",
            [resultt[0]],
            (err,result)=>{
                if(err){
                    console.log(err)
                    res.status(422).send("Erro na busca das ofertas");
                }
                else{
                    res.status(200).json(result);
                }
            });
        }
    })
});


module.exports = router;