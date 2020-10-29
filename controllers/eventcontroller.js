const Event = require('../models/Event');
const User = require('../models/User');

module.exports.events_get = async (req, res, next) => {
  const events = await Event.find().populate('user').sort({createdAt: 'desc'});

  res.render('events', {events});
}

module.exports.addevent_get = async (req, res, next) => {
  const users = await User.find({isAdmin: false}).sort({'profile.firstName': 'asc'});

  res.render('addevent', {users});
}

module.exports.events_post = async (req, res, next) => {
  const name = req.body.name ? req.body.name.trim() : '';
  const date = req.body.date ? req.body.date.trim() : '';
  const fee = req.body.fee ? req.body.fee.trim() : '';
  const startTime = req.body.startTime ? req.body.startTime.trim() : '';
  const endTime = req.body.endTime ? req.body.endTime.trim() : '';
  const invoiceStatus = req.body.invoiceStatus ? req.body.invoiceStatus.trim() : '';
  const status = 'SENT';
  const user = req.body.user ? req.body.user.trim() : '';
  const worksheetUrl = req.body.worksheetUrl ? req.body.worksheetUrl.trim() : '';

  const newEvent = new Event({
    name, date, fee, startTime, endTime, invoiceStatus, status, user, worksheetUrl
  });

  await newEvent.save();

 
  req.flash('success_msg', 'New Event Added Successfully');
  res.redirect('/events');
}

module.exports.event_delete = async (req, res, next) => {
  await Event.findByIdAndDelete(req.params.id);

  req.flash('success_msg', 'Event Deleted Successfully');
  res.redirect('/events');
}

module.exports.editevent_get = async (req, res, next) => {
  const users = await User.find({isAdmin: false}).sort({'profile.firstName': 'asc'});
  const event = await Event.findById(req.params.id);
  console.log(event);

  res.render('editevent', {users, event}); 
}

module.exports.editevent_post = async (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name ? req.body.name.trim() : '';
  const date = req.body.date ? req.body.date.trim() : '';
  const fee = req.body.fee ? req.body.fee.trim() : '';
  const startTime = req.body.startTime ? req.body.startTime.trim() : '';
  const endTime = req.body.endTime ? req.body.endTime.trim() : '';
  const invoiceStatus = req.body.invoiceStatus ? req.body.invoiceStatus.trim() : '';
  const user = req.body.user ? req.body.user.trim() : '';
  const worksheetUrl = req.body.worksheetUrl ? req.body.worksheetUrl.trim() : '';

  await Event.findByIdAndUpdate(id, {
    name, date, fee, startTime, endTime, invoiceStatus, user, worksheetUrl
  });
 
  req.flash('success_msg', 'Event Updated Successfully');
  res.redirect('/events');
}