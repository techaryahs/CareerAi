const express = require("express");
const router = express.Router();
const chatCtrl = require("../controllers/chat.controller");

router.post("/chat", chatCtrl.chat);

module.exports = router;
