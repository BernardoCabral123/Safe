const srcLocation = require("../../../srcLocation");
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const dbConnection = require("../../dbConnection");

// Getters{
    router.get(`/cursos`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaCurso ORDER BY sigla",(err,result)=>{
            if(err){
                res.status(422).send("Erro na recolha de cursos");
            }
            else{
                res.status(200).json(result);
            }
        })
    });
    router.get(`/cursos/:idCurso`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaCurso WHERE idCurso = ?",
        [req.params.idCurso]
        ,(err,result)=>{
            if(err){
                res.status(422).send("Erro na recolha de cursos");
            }
            else{
                res.status(200).json(result[0]);
            }
        })
    });
    router.get(`/turmas`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaTurma ORDER BY turma",(err,result)=>{
            if(err){
                console.log(err);
                res.status(422).send("Erro na recolha de turmas");
            }
            else{
                res.json(result);
            }
        })
    });
    router.get(`/turmas/:idCurso`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaTurma WHERE idCurso = ? ORDER BY turma",
        [req.params.idCurso],
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
        dbConnection.query("SELECT * FROM vistaFormando ORDER BY turma;",(err,result)=>{
            if(err){
                console.log(err);
                console.log("falha na execucao do query")
            }
            else{
                res.json(result);
            }
        })
    });
    router.get(`/formandos/:idTurma`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaFormando WHERE idTurma = ?;",[req.params.idTurma],(err,result)=>{
            if(err){
                console.log(err);
                console.log("falha na execucao do query")
            }
            else{
                res.json(result);
            }
        })
    });
    router.get(`/admins`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaAdmin ORDER BY nome",(err,result)=>{
            if(err){
                res.status(422).send("Erro na recolha de admins");
            }
            else{
                res.status(200).json(result);
            }
        })
    });
    router.get(`/diretores`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaDiretorTurma ORDER BY nome",(err,result)=>{
            if(err){
                console.log(err);
                res.status(422).send("Erro na recolha de dos diretores de turma");
            }
            else{
                res.json(result);
            }
        })
    });
    router.get(`/empresas`,(req,res)=>{
        dbConnection.query("SELECT * FROM vistaEmpresa ORDER BY nome",(err,result)=>{
            if(err){
                console.log(err);
                res.status(422).send("Erro na recolha de empresas");
            }
            else{
                res.json(result);
            }
        })
    });
// }Getters

// CRUD cursos{
    router.post(`/cursos`,(req,res)=>{
        dbConnection.query("INSERT INTO curso (idArea, nome, sigla, duracao) VALUES (?, ?, ?, ?)",
                [req.body.idArea, req.body.nome, req.body.sigla, req.body.duracao],
                (err,result)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na introdução de curso");
                    }
                    else{                        
                        res.status(200).send("Curso criado com sucesso")
                        };
    })});
    router.put(`/cursos`,(req,res)=>{
        dbConnection.query("UPDATE curso SET idArea = ?, nome = ?, sigla = ?, duracao = ? WHERE idCurso = ?",
                [req.body.idArea, req.body.nome, req.body.sigla, req.body.duracao, req.body.idCurso],
                (err,result)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na atualização de curso");
                    }
                    else{                        
                        res.status(200).send("Curso atualizado com sucesso")
                        };
    })});
    router.delete(`/cursos`,(req,res)=>{
        dbConnection.query("DELETE FROM curso WHERE idCurso = ?",
                [req.body.idCurso],
                (err,result)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na eliminação de curso");
                    }
                    else{                        
                        res.status(200).send("Curso eliminado com sucesso")
                        };
    })});
// CRUD }cursos

// CRUD turmas{
    router.post(`/turmas`,(req,res)=>{
        dbConnection.query("INSERT INTO turma (idCurso, numero, ano) VALUES (?, ?, ?)",
        [req.body.idCurso, req.body.numero, req.body.ano],
        (err,resultt)=>{
            if(err){
                console.log(err);
                res.status(422).send("Erro na criação da turma");
            }
            else{              
                dbConnection.query("INSERT INTO turma_conta (idTurma, idConta) VALUES (?, ?)",[resultt.insertId,req.body.idConta],(err,result)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na criação da turma");
                    }
                    else{  
                        res.status(200).send("Turma criado com sucesso")
                        };
                });    
            };
        })
    });
    router.put(`/turmas`,(req,res)=>{
                
        dbConnection.query("UPDATE turma SET idCurso = ?, numero = ?, ano = ? WHERE (`idTurma` = ?)",
        [req.body.idCurso,req.body.numero,req.body.ano,req.body.idTurma],
        (err,resultt)=>{
            if(err){
                console.log(err);
                    res.status(422).send("Erro na atualização da turma");
            }
            else{
                dbConnection.query("CALL LimparDiretorTurma(?)",
                [req.body.idTurma],
                (err,result)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na atualização da turma");
                    }
                    else{
                        if(req.body.idConta){    
                        dbConnection.query("INSERT INTO `pap-plataformaestagios`.`turma_conta` (`idTurma`, `idConta`) VALUES (?,?)",
                        [req.body.idTurma,req.body.idConta],
                        (err,result)=>{
                            if(err){
                                console.log(err);
                                    res.status(422).send("Erro na atualização da turma");
                            }
                            else{
                            res.status(200).send("Turma atualizada com sucesso")
                            }
                        });}
                        else res.status(200).send("Turma atualizada com sucesso")                  
                    };
                });
            }
        });
    });
    router.delete(`/turmas`,(req,res)=>{
        dbConnection.query("CALL deleteTurma(?)",
                [req.body.idTurma],
                (err,result)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na eliminação da turma");
                    }
                    else{                        
                        res.status(200).send("Turma eliminada com sucesso")
                        };
    })});
// CRUD }turmas

// CRUD users{
    router.post(`/users`,(req,res)=>{
        
        let generatedPass = Math.random().toString(36).substring(2, 15);
        //let generatedPass = '123';

        console.log(req.body.tipoConta)
        console.log(req.body.nome)
        console.log(req.body.email)

        dbConnection.query(`SELECT COUNT(conta.idConta) AS contagem FROM conta WHERE conta.email = ?`,
        [req.body.email],
        (err,result)=>{
            if(err){
                console.log(err)
            }else
                if(result[0].contagem == 0){
                dbConnection.query("INSERT INTO conta (tipoConta, email, password, nome) VALUES (?,?,?,?)",
                [req.body.tipoConta, req.body.email, bcryptjs.hashSync(escape(generatedPass,bcryptjs.genSaltSync(2))), req.body.nome],
                (err,resultt)=>{
                    if(err){
                        console.log(err);
                        res.status(422).send("Erro na introdução");
                    }
                    else{
                        dbConnection.query(
                            'UPDATE conta SET publicKey = ?, privateKey = ? WHERE idConta = ?',
                            [Math.random().toString(36).substring(2) + resultt.insertId, Math.random().toString(36).substring(2) + resultt.insertId, resultt.insertId],
                            (error,result)=>{
                                if (error){
                                    console.log(err);
                                    res.status(422).send("Erro na criação de conta")
                                }
                                else{
                                    if(req.body.idTurma){
                                        dbConnection.query("INSERT INTO turma_conta (idTurma,idConta) VALUES (?,?)",
                                        [req.body.idTurma, resultt.insertId],
                                        (err,result)=>{
                                            if(err){
                                                console.log(err);
                                                res.send("Erro na introdução");
                                            }
                                            else{
                                                res.status(200).send("Conta criada com sucesso")
                                            }
                                        
                                        })
                                    }
                                    else{
                                        res.status(200).send("Conta criada com sucesso")
                                    }
                            }
                        });
                    };
                });
            }
            else{
                res.send("Já existe uma conta com esse email")
            }
        })
    });
    router.put(`/users`,(req,res)=>{
                
        dbConnection.query("UPDATE conta SET nome = ? WHERE (`idConta` = ?)",
        [req.body.nome,req.body.idConta],
        (err,result)=>{
            if(err){
                console.log(err);
                    res.status(422).send("Erro na atualização da turma");
            }
            else{
                if(req.body.idTurma){
                    dbConnection.query("CALL LimparFormandoTurma(?)",
                    [req.body.idConta],
                    (err,result)=>{
                        if(err){
                            console.log(err);
                            res.status(422).send("Erro na atualização da turma");
                        }
                        else{
                            if(req.body.idConta){    
                            dbConnection.query("INSERT INTO `pap-plataformaestagios`.`turma_conta` (`idTurma`, `idConta`) VALUES (?,?)",
                            [req.body.idTurma,req.body.idConta],
                            (err,result)=>{
                                if(err){
                                    console.log(err);
                                        res.status(422).send("Erro na atualização da conta");
                                }
                                else{
                                res.status(200).send("Conta atualizada com sucesso")
                                }
                            });}                
                        };
                    });
                }
                else{
                    res.status(200).send("Conta atualizada com sucesso")
                }
            }
        });
    });
    router.delete(`/users`,(req,res)=>{
        dbConnection.query("CALL deleteConta(?)",
        [req.body.idConta],
        (err,result)=>{
            if(err){
                console.log(err);
                res.status(422).send("Erro na eliminação da conta");
            }
            else{                    
                res.status(200).send("Conta eliminada com sucesso")
                };
        });
    });
// }CRUD users

module.exports = router;