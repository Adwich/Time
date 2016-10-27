'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const Project = mongoose.model('Project');
const co = require('co');

/**
 * Clear database
 *
 * @param {Object} t<Ava>
 * @api public
 */

exports.cleanup = function (t) {
    co(function* () {
        yield Task.remove();
        yield Project.remove();
        t.end();
    });
};
