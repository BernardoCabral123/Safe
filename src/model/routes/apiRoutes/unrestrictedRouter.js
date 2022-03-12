const srcLocation = require("../../../srcLocation");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthentication = require("../../userAuthentication");

const bcryptjs = require("bcryptjs");
const dbConnection = require("../../dbConnection");

router.post(`/registo`,(req,res)=>{

    dbConnection.query(`SELECT COUNT(conta.idConta) AS contagem FROM conta WHERE conta.email = ?`,
    [req.body.email],
    (err,result)=>{
        if(err){
            console.log(err)
        }else
            if(result[0].contagem == 0){
            dbConnection.query("INSERT INTO conta (tipoConta, email, password, nome, contactoTelefonico) VALUES (?,?,?,?,?)",
            [req.body.tipoConta, req.body.email, bcryptjs.hashSync(escape(req.body.password,bcryptjs.genSaltSync(2))), req.body.nome, req.body.contactoTelefonico],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send("Erro na introdução");
                }
                else{
                      dbConnection.query(
                        'UPDATE conta SET publicKey = ?, privateKey = ? WHERE idConta = ?',
                        [Math.random().toString(36).substring(2) + result.insertId, Math.random().toString(36).substring(2) + result.insertId, result.insertId],
                        (error,result)=>{
                          if (error) throw error
                    });
                            fs.mkdir(path.join(srcLocation,`/users/${result.insertId}`), (error) => {
                                if (error) {
                                  console.log(error);
                                }
                              });
                            
                        
                res.send("Conta criada com sucesso")
                    };
          });
        }
        else{
            res.send("Já existe uma conta com esse email")
        }
    })

});

router.get("/",userAuthentication.checkAuth,(req,res)=>{
    res.json({"msg": "autorizado"});
})

router.post("/login", userAuthentication.login)

router.post("/getAuth", userAuthentication.getTipoConta)

router.get(`/ilhas`,(req,res)=>{
    dbConnection.query("SELECT * FROM ilha;",(err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

router.get(`/concelhos`,(req,res)=>{
    dbConnection.query("SELECT * FROM concelho;",(err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});

router.get('/concelhos/:id', function(req, res) {
    dbConnection.query(`SELECT * FROM concelho WHERE idIlha = ${req.params.id};`,(err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        } 
  });
});

router.get(`/areas`,(req,res)=>{
    dbConnection.query("SELECT * FROM area;",(err,result)=>{
        if(err){
            console.log("falha na execucao do query")
        }
        else{
            res.json(result);
        }
    })
});
module.exports = router;