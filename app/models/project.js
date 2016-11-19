var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    priority: Number, // [1..5]
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

/**
 * Validations
 */

ProjectSchema.path('name').required(true, 'Project name cannot be blank');
ProjectSchema.path('priority').required(true, 'Project priority cannot be blank');

module.exports = mongoose.model('Project', ProjectSchema);
