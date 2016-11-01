'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('./app/routes/task.js');
var Project = require('./app/models/project');

/*
  Route                 | HTTP Verb | Description
  /api/tasks              GET         Get all tasks
  /api/tasks              POST        Create a task
  /api/tasks/:task_id     GET         Get a task
  /api/tasks/:task_id     PUT         Update a task with new info
  /api/tasks/:task_id     DELETE      Delete a task
*/

// connect to mongodb
// mongoose.connect('mongodb://ananasr:gofuckyourself@ds063536.mlab.com:63536/time');
mongoose.connect('mongodb://localhost:27017/time');

// verify connection status
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.on('open', function() {
    console.log('connected');
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



var router = express.Router();

// middleware
router.use(function(req, res, next) {
    // print request
    next();
});

// routes that end in /tasks
router.route('/tasks')
    .post(Task.postTask)
    .get(Task.getTasks);

// routes that end in /tasks/:task_id
router.route('/tasks/:task_id')
    .get(Task.getTask)
    .put(Task.updateTask)
    .delete(Task.deleteTask);

// Register our routes
app.use('/api', router);

module.exports = app;
