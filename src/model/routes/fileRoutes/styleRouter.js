const srcLocation = require("../../../srcLocation");
const path = require("path");
const express = require("express");
const router = express.Router();


router.get("/style.css",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/css/style.css"));
})

router.get("/login.css",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/css/login.css"));
})

router.get("/gerirRecursos.css",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/css/gerirRecursos.css"));
})

router.get("/ofertas.css",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/css/ofertas.css"));
})

router.get("/main.css",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/css/main.css"));
})

router.get("/minhaArea.css",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/css/minhaArea.css"));
})

module.exports = router;
