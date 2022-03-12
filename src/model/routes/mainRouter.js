const srcLocation = require("../../srcLocation");
const path = require("path");
const express = require("express");
const router = express.Router();

router.use("/api",require("./apiRouter"));

router.use("/files",require("./fileRouter"));

router.get("/",(req,res)=>{
    res.sendFile(path.join(srcLocation,"/view/html/indexPage.html"));
})

module.exports = router;