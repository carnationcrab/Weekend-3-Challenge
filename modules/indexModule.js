console.log('in indexModule.js');

var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
    var indexPath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(indexPath);
})

module.exports = router;