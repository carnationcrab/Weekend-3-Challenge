//spinup

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

//routing

var indexModule = require('./modules/indexModule');
//var toDoRoute = require('./routes/toDoRoute');

//uses

app.use('/', indexModule);
//app.use('/toDos', toDoModule);
app.use(express.static('public'));

//ears up

app.listen(port, function() {
    console.log('listening on port', port);
    
});
