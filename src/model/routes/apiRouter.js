const express = require("express");
const router = express.Router();
const userAuthentication = require("../userAuthentication");


router.use("/unrestricted", require("./apiRoutes/unrestrictedRouter"));



router.use("/admin", userAuthentication.checkAuthAdmin, require("./apiRoutes/adminRouter"));

router.use("/diretorTurma", userAuthentication.checkAuthDiretorTurma, require("./apiRoutes/diretorTurmaRouter"));

router.use("/formando",userAuthentication.checkAuthFormando, require("./apiRoutes/formandoRouter"));

router.use("/empresa",userAuthentication.checkAuthEmpresa, require("./apiRoutes/empresaRouter"));


module.exports = router;