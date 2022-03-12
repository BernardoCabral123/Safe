const express = require("express");
const router = express.Router();
const userAuthentication = require("../userAuthentication");


router.use("/unrestricted", require("./apiRoutes/unrestrictedRouter"));

router.use("/aluno",userAuthentication.checkAuthFormando, require("./apiRoutes/alunoRouter"));

router.use("/admin", userAuthentication.checkAuthAdmin, require("./apiRoutes/adminRouter"));

router.use("/diretorTurma", userAuthentication.checkAuthDiretorTurma, require("./apiRoutes/diretorTurmaRouter"));


module.exports = router;