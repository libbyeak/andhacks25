const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/test', (req, res) => {
    console.log('router invoked');
    res.send('Test');
    res.status(200);
});

module.exports = router;