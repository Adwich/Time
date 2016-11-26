'use strict';

var express = require('express');
var app = express();
var path = require('path');
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

// connect to mongo container
mongoose.connect('mongodb://mongo:27017/time');

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
app.use(express.static('app/views'));

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

// serve index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/views/index.html'));
});

module.exports = app;
