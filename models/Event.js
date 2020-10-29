const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  fee: Number,
  startTime: Date,
  endTime: Date,
  invoiceStatus: String,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  worksheetUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

EventSchema.set('toObject', {virtuals: true})
EventSchema.set('toJSON', {virtuals: true})

module.exports = mongoose.model('Event', EventSchema);
