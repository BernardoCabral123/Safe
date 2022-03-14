const express = require("express");
const router = express.Router();

const dbConnection = require("../../dbConnection");

router.get(`/ofertas/inscritas`,(req,res)=>{
    dbConnection.query("SELECT 	vistaOferta.idOferta, nome, titulo, descricao, deferido FROM	vistaOferta, oferta_conta WHERE	vistaOferta.idOferta = oferta_conta.idOferta AND oferta_conta.idConta = ?",
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

router.get(`/ofertas/confirmadas`,(req,res)=>{
    dbConnection.query("SELECT nome, titulo, descricao FROM vistaOferta,oferta_conta WHERE vistaOferta.idOferta = oferta_conta.idOferta AND oferta_conta.confirmado = 1 AND oferta_conta.idConta = ?",
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
            dbConnection.query("SELECT vistaOferta.idOferta, nome, titulo, descricao FROM vistaOferta WHERE idArea = ? AND vistaOferta.idOferta NOT IN (SELECT vistaOferta.idOferta FROM	vistaOferta, oferta_conta WHERE	vistaOferta.idOferta = oferta_conta.idOferta AND oferta_conta.idConta = ?);",
            [resultt[0],req.user.idConta],
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

router.post(`/ofertas/inscrever`,(req,res)=>{
    dbConnection.query("INSERT INTO oferta_conta (`idOferta`, `idConta`) VALUES (?, ?);",
    [req.body.idOferta, req.user.idConta],
    (err,result)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na inscricao da oferta");
        }
        else{
            res.status(200).send("inscrito com sucesso");
        }
    })
});

router.put(`/ofertas/confirmar`,(req,res)=>{
    dbConnection.query("UPDATE `pap-plataformaestagios`.`oferta_conta` SET `confirmado` = '1' WHERE (`idOferta` = ?) and (`idConta` = ?);",
    [req.body.idOferta, req.user.idConta],
    (err,result)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na inscricao da oferta");
        }
        else{
            res.status(200).send("inscrito com sucesso");
        }
    })
});

router.delete(`/ofertas/desinscrever`,(req,res)=>{
    dbConnection.query("DELETE FROM oferta_conta WHERE idOferta = ? AND idConta = ?",
    [req.body.idOferta, req.user.idConta],
    (err,result)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na desinscricao da oferta");
        }
        else{
            res.status(200).send("Desinscrito com sucesso");
        }
    })
});

module.exports = router;