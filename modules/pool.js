var express = require('express');
var router = express.Router();
var Pool = require('pg').Pool

var config = {
    host: "localhost",
    port: 5432,
    database: "toDos",
    max: 20
};

var thePool = new Pool(config);

module.exports = thePool;