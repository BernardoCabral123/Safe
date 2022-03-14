const express = require("express");
const router = express.Router();

const dbConnection = require("../../dbConnection");

router.get(`/ofertas`,(req,res)=>{
    dbConnection.query("SELECT * FROM vistaOferta WHERE idConta = ?",
    [req.user.idConta],
    (err,result)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na busca das ofertas");
        }
        else{
            res.status(200).json(result);
        }
    })
});

router.post(`/ofertas`,(req,res)=>{
    dbConnection.query("INSERT INTO `oferta` (`idConta`, `idArea`, `titulo`, `descricao`, `vagas`) VALUES (?, ?, ?, ?, ?);",
    [req.user.idConta,req.body.idArea,req.body.titulo,req.body.descricao,req.body.vagas],
    (err,result)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na criacao da oferta");
        }
        else{
            res.status(200).send("Oferta criada com sucesso");
        }
    })
});


router.put(`/ofertas`,(req,res)=>{
    dbConnection.query("UPDATE `oferta` SET `idArea` = ?, `titulo` = ?, `descricao` = ? WHERE (`idOferta` = ?)",
    [req.body.idArea,req.body.titulo,req.body.descricao,req.body.idOferta],
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(422).send("Erro na edicao da oferta");
        }
        else{
            res.status(200).send("Oferta atualizada com sucesso");
        }
    })
});


router.delete(`/ofertas`,(req,res)=>{
    dbConnection.query("DELETE FROM `pap-plataformaestagios`.`oferta` WHERE (`idOferta` = ?)",
    [req.body.idOferta],
    (err,result)=>{
        if(err){
            console.log(err)
            res.status(422).send("Erro na eliminacao da oferta");
        }
        else{
            res.status(200).send("Oferta eliminada com sucesso");
        }
    })
});

module.exports = router;