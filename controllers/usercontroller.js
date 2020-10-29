const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.user_get = async (req, res, next) => {
  const users = await User.find({isAdmin: false}).sort({'profile.firstName': 'asc'});
  res.render('users', {users});
} 

module.exports.user_post = async (req, res, next) => {
  const firstName = req.body.firstName ? req.body.firstName.trim() : '';
  const lastName = req.body.lastName ? req.body.lastName.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const phone = req.body.phone ? req.body.phone.trim() : '';
  const address = req.body.address ? req.body.address.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    profile: {
      firstName,
      lastName,
      phone,
      address,
    },
    email,
    password: passwordHash,
  });

  await newUser.save();

  req.flash('success_msg', 'New Artist Added Successfully');
  res.redirect('/users');
} 

module.exports.user_delete = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  
  req.flash('success_msg', 'Artist Deleted Successfully');
  res.redirect('/users');
} 

module.exports.edituser_post = async (req, res, next) => {
  const id = req.body.id;
  const firstName = req.body.firstName ? req.body.firstName.trim() : '';
  const lastName = req.body.lastName ? req.body.lastName.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const phone = req.body.phone ? req.body.phone.trim() : '';
  const address = req.body.address ? req.body.address.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';

  if (password == '') {
    await User.findByIdAndUpdate(id, {
      profile: {
        firstName,
        lastName,
        phone,
        address
      },
      email
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    await User.findByIdAndUpdate(id, {
      profile: {
        firstName,
        lastName,
        phone,
        address
      },
      email,
      password: passwordHash
    });
  }

  req.flash('success_msg', 'Artist Updated Successfully');
  res.redirect('/users');
} 

module.exports.adduser_get = (req, res, next) => {
  res.render('adduser')
} 

module.exports.edituser_get = async (req, res, next) => {
  const foundUser = await User.findById(req.params.id);
  res.render('edituser', {foundUser});
} 