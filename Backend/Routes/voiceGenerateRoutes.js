const express = require('express');
const { createVoice } = require('../Controllers/voiceController');
const router = express.Router();


router.post("/",createVoice);

module.exports = router;