'use strict';

var mongoose = require('mongoose');
var test = require('tape');
var request = require('supertest');
var app = require('../time');
var { cleanup } = require('./utils');
var Task = mongoose.model('Task');
var Project = mongoose.model('Project');

test('Clean up', cleanup);

/*
 * Test our CRUD application
 */

test('CREATE TASK', t => {
    var task = {
        name: 'test_task_new_project',
        desc: 'test_desc_new_project',
        priority: 1,
        deadline: Date.now(),
        project: {
            name: 'new_project',
            priority: 5
        }
    };

    request(app)
        .post('/api/tasks')
        .send(task)
        .expect(201)
        .end(function(err, res) {
            Task.find({ name: 'test_task_new_project'}, function(err, task) {
                if (err) throw err; // TODO assert not null
                console.log(task);
                Project.find({ name: 'new_project' }, function(err, project) {
                    if (err) throw err; // TODO assert not null
                    console.log(project);
                    t.equals(task.project, project._id);
                });
            });
            console.log(res.body);
            t.end();
        });
});

test('READ TASK', t => {
    t.end();
});

test('UPDATE TASK', t => {
    t.end();
});

test('REMOVE TASK', t => {
    t.end();
});

/*
 * Test errors
 */

test('finish', t => {
    mongoose.disconnect();
    t.pass('closing db connection');
    t.end();
});
