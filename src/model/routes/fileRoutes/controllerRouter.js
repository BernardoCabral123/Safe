const srcLocation = require("../../../srcLocation");
const path = require("path");
const express = require("express");
const router = express.Router();


router.get("/indexPageController.js",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/controller/indexPageController.js"));
})


router.get("/admin.js",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/controller/admin.js"));
})

router.get("/diretorTurma.js",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/controller/diretorTurma.js"));
})

router.get("/formando.js",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/controller/formando.js"));
})

router.get("/empresa.js",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/controller/empresa.js"));
})

router.get("/naoAutenticado.js",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/controller/naoAutenticado.js"));
})

module.exports = router;