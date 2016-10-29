var mongoose = require('mongoose');
var Task = require('../models/task');
var Project = require('../models/project');

function getTasks(req, res) {
    var query = Task.find({});

    query.exec((err, tasks) => {
        if (err) res.send(err);
        res.json(tasks);
    });
}

function postTask(req, res) {
    var newTask = new Task(req.body);

    newTask.save((err, task) => {
        if (err) res.send(err);
        res.json({
            message: 'Task successfully created!',
            task
        });
    });
}

function getTask(req, res) {
    Task.findById(req.params.task_id, (err, task) => {
        if (err) res.send(err);
        res.json(task);
    });
}

function deleteTask(req, res) {
    Task.remove({ _id: req.params.task_id }, (err, result) => {
        if (err) res.send(err);
        res.json({
            message: 'Task deleted!'
        });
    });
}

function updateTask(req, res) {
    Task.findById({ _id: req.params.task_id }, (err, task) => {
        if (err) res.send(err);
        Object.assign(task, req.body).save((err, task) => {
            if (err) res.send(err);
            res.json({
                message: 'Task updated!',
                task
            });
        });
    });
}

module.exports = {
    getTasks,
    postTask,
    getTask,
    deleteTask,
    updateTask
};
