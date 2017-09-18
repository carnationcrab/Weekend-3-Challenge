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
            client.query("SELECT * FROM listofthings;", function(err, resObj){
                done();
                if (err) {
                    res.sendStatus(500);
                    console.log('shit broke in toDoRoute GET ->', err);
                    
                } else {
                    res.send(resObj.rows);
                }
            });
        }
    });
});

router.post('/', function(req, res){
    var task = req.body;

    pool.connect(function(err,client,done){
        if (err) {
            res.sendStatus(500);
        } else {
            var text = 'INSERT INTO listofthings (name, description, due, complete) VALUES ($1, $2, $3, $4);';
            var values = [task.name, task.description, task.dueDate, task.complete];
            client.query(text, values, function(err, resultObj){
                console.log('in the SQL Query with ->', values);
                done();
                if (err) {
                    console.log('shit happened ->', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.delete('/:id', function(req,res){
    var dbID = req.params.id;
    console.log('dbID', dbID);
    pool.connect(function (err, client, done){
        if(err) {
            res.sendStatus(500);
        } else {
            var text = 'DELETE FROM listofthings WHERE id = $1;';
            client.query(text, [dbID], function(){
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    });
});

module.exports = router