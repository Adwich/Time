var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    priority: Number // [1..5]
    //tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = mongoose.model('Project', ProjectSchema);
