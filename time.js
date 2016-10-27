'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('./app/models/task');
var Project = require('./app/models/project');

// TODO use middleware for math computing

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

//var port = process.env.PORT || 8888;

var router = express.Router();

// middleware
router.use(function(req, res, next) {
    console.log('hey!');
    console.log(req.body);
    next();
});

// routes that end in /tasks
router.route('/tasks')
    // create a task
    .post(function(req, res) {
        if (req.body.project) {
            var taskProject;
            // create or update project
            Project.findOne({ name: req.body.project.name }, function(err, project) {
                if (err) console.error(err);
                if (project) {
                    // update
			              console.log('update');
                    console.log(project);
                    taskProject = project;
                } else {
                    // create
			              console.log('create');
                    console.log(project);
                    taskProject = new Project();

                    taskProject.name = req.body.project.name;
                    taskProject.priority = req.body.project.priority;

                    taskProject.save(function(err) {
                        if (err)
                            res.send(err);
                        console.log('project created');
                    });
                }

                var task = new Task({
                    // create
                    name: req.body.name,
                    desc: req.body.desc,
                    priority: req.body.priority,
                    deadline: req.body.deadline,
                    project: taskProject._id
                });

                // save
                task.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({
                        message: 'Task created!'
                    });
                });
            });
        }
    })
    // get all tasks
    .get(function(req, res) {
        Task.find(function(err, tasks) {
            if (err)
                res.send(err);
            res.json(tasks);
        });
    });

// routes that end in /tasks/:task_id
router.route('/tasks/:task_id')
    // get task by id
    .get(function(req, res) {
        Task.findById(req.params.task_id, function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    })
    // update the task with this id ...
    .put(function(req, res) {
        Task.findById(req.params.task_id, function(err, task) {
            if (err)
                res.send(err);

            // update
            task.name = req.body.name;
            task.desc = req.body.desc;
            task.priority = req.body.priority;
            task.score = req.body.score;

            // save
            task.save(function(err) {
                if (err)
                    res.send(err);
                res.json({
                    message: 'Task updated!'
                });
            });
        });
    })
    // ... and delete!
    .delete(function(req, res) {
        Task.remove({
            _id: req.params.task_id
        }, function(err, task) {
            if (err)
                res.send(err);
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

// Register our routes
app.use('/api', router);

module.exports = app;
