var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var queueSchema = new Schema({
  queueId: String,

  onQueue: {
    type: Boolean,
    default: true
  },

  created_date: {
    type: Date,
    default: Date.now,
    once: true
  },

  updated: {
    type: Date,
    default: Date.now,

  }

});
var queueModel = mongoose.model('Blog', queueSchema);
module.exports = queueModel