'use strict';

var mongoose = require('mongoose');
var test = require('tape');
var request = require('supertest');
var app = require('../time');
var User = mongoose.model('Task');
var Project = mongoose.model('Project');

test('create task', t => {
    var task = {
        name: 'test_task',
        desc: 'test_desc',
        priority: 3,
        deadline: Date.now()
    };

    request(app)
        .post('/api/tasks')
        .send(task)
        .expect(201)
        .end(function(err, res) {
            //console.log(res.body);
            t.end();
        });
});

test('create task with new project', t => {
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
            Project.find({ name: 'new_project' }, function(err, project) {
                if (err) throw err;
                console.log(project);
            });
            console.log(res.body);
            t.end();
        });
});

test('my first test', t => {
    request(app)
        .get('/api/tasks')
        .expect('Content-Type', '/json')
        .expect(200)
        .end(function(err, res) {
            console.log(res.body);
            t.end();
        });
});


test('finish', t => {
    mongoose.disconnect();
    t.pass('closing db connection');
    t.end();
});
