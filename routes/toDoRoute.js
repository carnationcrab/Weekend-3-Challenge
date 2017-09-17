console.log('in toDoRoute.js');

var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('inside toDoRoute GET');
    pool.connect(function(err, client, done){
        if (err) {
            res.sendStatus(500);
        } else {
            client.query("SELECT * FROM thingstodo", function(err, resObj){
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(resObj.rows);
                }
            });
        }
    });
});

module.exports = router