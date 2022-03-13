const srcLocation = require("../../../srcLocation");
const path = require("path");
const express = require("express");
const router = express.Router();

//home

router.get("/work.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/work.svg"));
})

router.get("/procurar.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/procurar.png"));
})

router.get("/numero-1.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/numero-1.png"));
})

router.get("/numero-2.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/numero-2.png"));
})

router.get("/numero-3.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/numero-3.png"));
})

router.get("/numero-1verde.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/numero-1verde.png"));
})

router.get("/numero-2verde.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/numero-2verde.png"));
})

router.get("/numero-3verde.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/numero-3verde.png"));
})

router.get("/userLogin.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/userLogin.png"));
})

router.get("/candidate.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/candidate.png"));
})

router.get("/check.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/check.png"));
})

router.get("/Estagio.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/Estagio.svg"));
})

router.get("/CriarConta.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/CriarConta.png"));
})

router.get("/serAceito.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/serAceito.png"));
})

router.get("/empresa.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/empresa.png"));
})

router.get("/pasta.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/pasta.png"));
})
//logos

router.get("/logoEnta.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/logoEnta.png"));
})


router.get("/logoPlataforma.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/logoPlataforma.png"));
})

router.get("/logoPlataformaPrincipal.png",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/logoPlataformaPrincipal.png"));
})

router.get("/MUSAMI.jpg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/MUSAMI.jpg"));
})

//Criar Conta empresa

router.get("/criarEmpre.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/criarEmpre.svg"));
})

//criar Anuncio
router.get("/criarAnuncio.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/criarAnuncio.svg"));
})



//profile
router.get("/profile.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/profile.svg"));
})

//dashboard

router.get("/admin.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/admin.svg"));
})

router.get("/criarAluno.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/criarAluno.svg"));
})

router.get("/curso.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/curso.svg"));
})

router.get("/turma.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/turma.svg"));
})

router.get("/diretorTurma.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/diretorTurma.svg"));
})

//duvidas
router.get("/duvidas.svg",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/assets/duvidas.svg"));
})

module.exports = router;
