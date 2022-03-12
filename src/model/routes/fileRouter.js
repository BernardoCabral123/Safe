const express = require("express");
const router = express.Router();

const assetRouter = require("./fileRoutes/assetRouter");
router.use("/assets",assetRouter);

const controllerRouter = require("./fileRoutes/controllerRouter");
router.use("/controllers",controllerRouter);

const styleRouter = require("./fileRoutes/styleRouter");
router.use("/styles",styleRouter);

module.exports = router;
