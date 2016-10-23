var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * Task Schema
 */

var TaskSchema = new Schema({
    name: String,
    desc: String,
    priority: { type: Number, default: 1 }, // [1..5]
    score: Number,
    start: Date,
    deadline: Date,
    project: { type: Schema.Types.ObjectId, ref: 'Project'}
});

/**
 * Validations
 */

TaskSchema.path('name').required(true, 'Task name cannot be blank');
TaskSchema.path('deadline').required(true, 'Task deadline cannot be blank');

module.exports = mongoose.model('Task', TaskSchema);
