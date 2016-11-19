'use strict';

var mongoose = require('mongoose');
var test = require('tape');
var request = require('supertest');
var app = require('../time');
var {
    cleanup
} = require('./utils');
var Task = mongoose.model('Task');
var Project = mongoose.model('Project');

// clean database
test('Clean up', cleanup);

/*
 * Test our CRUD application
 */

test('/POST task', t => {
    var task = {
        name: 'foo',
        desc: 'foo',
        priority: 1,
        deadline: Date.now()
            // project: {
            //     name: 'new_project',
            //     priority: 5
            // }
    };

    request(app)
        .post('/api/tasks')
        .send(task)
        .expect(201)
        .end(function(err, res) {
            console.log(res.body);
            Task.find({
                name: 'foo'
            }, function(err, task) {
                if (err) throw err;
                // Project.find({ name: 'new_project' }, function(err, project) {
                //     if (err) throw err;
                //     t.notEqual(project.length, 0);
                //     t.equal(task.project, project._id);
                // });
            });
            t.end();
        });
});

test('/GET/:id task', t => {
    Task.create({
        name: 'dummy',
        desc: 'dummy',
        priority: 4,
        deadline: Date.now()
    }, function(err, task) {
        if (err) throw err;
        request(app)
            .get('/api/tasks/' + task._id)
            .expect(200)
            .end(function(err, res) {
                t.equals(res.body.name, 'dummy');
                t.equals(res.body.desc, 'dummy');
                t.equals(res.body.priority, 4);
                t.end();
            });
    });
});

test('/PUT/:id task', t => {
    Task.create({
        name: 'bar',
        desc: 'bar',
        priority: 2,
        deadline: Date.now()
    }, function(err, task) {
        if (err) throw err;
        request(app)
            .put('/api/tasks/' + task._id)
            .send({
                name: 'egg',
                desc: 'egg'
            })
            .expect(200)
            .end(function(err, res) {
                t.equals(res.body.message, 'Task updated!');
                t.equals(res.body.task.name, 'egg');
                t.equals(res.body.task.desc, 'egg');
                t.end();
            });
    });
});

test('/DELETE/:id task', t => {
    Task.create({
        name: 'grunt',
        desc: 'grunt',
        priority: 2,
        deadline: Date.now()
    }, function(err, task) {
        if (err) throw err;
        request(app)
            .delete('/api/tasks/' + task._id)
            .expect(200)
            .end(function(err, res) {
                t.equals(res.body.message, 'Task deleted!');
                t.end();
            });
    });
});

// ============= Test models =============

test('Create task with project', t => {
    var project = new Project({
        name: 'project_test',
        priority: 5
    });

    project.save(function(err) {
        if (err) throw err;

        var task = new Task({
            name: 'toto',
            desc: 'titi',
            priority: 4,
            deadline: Date.now(),
            project: project._id
        });

        task.save(function(err) {
            if (err) throw err;

            Task
                .findOne({
                    name: 'toto'
                })
                .populate('project')
                .exec(function(err, task) {
                    if (err) throw err;
                    t.equals(task.project.name, project.name);
                    t.equals(task.project.priority, project.priority);
                    project.tasks.push(task);
                    project.save(function(err) {
                        Project
                            .findOne({
                                name: 'project_test'
                            })
                            .populate('tasks')
                            .exec(function(err, project) {
                                if (err) throw err;
                                t.equals(project.tasks.length, 1);
                                t.equals(project.tasks[0].name, task.name);
                                t.equals(project.tasks[0].desc, task.desc);
                                t.equals(project.tasks[0].priority, task.priority);
                                //t.equals(project.tasks[0].deadline, task.deadline);
                                t.end();
                            });
                    });
                });
        });
    });
});

/*
 * Test errors
 */

test('finish', t => {
    mongoose.disconnect();
    t.pass('closing db connection');
    t.end();
});
