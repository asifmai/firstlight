const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const userController = require('../controllers/usercontroller');
const eventController = require('../controllers/eventcontroller');
const auth = require('../helpers/auth');

/* GET users listing. */
router.get('/', auth.ensureAuthenticatedAdmin, adminController.admin_get);

/* GET - Public - Show admin log in page */
router.get('/login', adminController.login_get);

/* POST - Public - admin log */
router.post('/login', adminController.login_post);

/* GET - Public - admin log out */
router.get('/logout', auth.ensureAuthenticatedAdmin, adminController.logout_get);

// User Routes
router.get('/users', auth.ensureAuthenticatedAdmin, userController.user_get);
router.get('/users/add', auth.ensureAuthenticatedAdmin, userController.adduser_get);
router.post('/users', auth.ensureAuthenticatedAdmin, userController.user_post);
router.get('/users/delete/:id', auth.ensureAuthenticatedAdmin, userController.user_delete);
router.get('/users/edit/:id', auth.ensureAuthenticatedAdmin, userController.edituser_get);
router.post('/users/edit', auth.ensureAuthenticatedAdmin, userController.edituser_post);

// Event Routes
router.get('/events', auth.ensureAuthenticatedAdmin, eventController.events_get);
router.get('/events/add', auth.ensureAuthenticatedAdmin, eventController.addevent_get);
router.post('/events', auth.ensureAuthenticatedAdmin, eventController.events_post);
router.get('/events/delete/:id', auth.ensureAuthenticatedAdmin, eventController.event_delete);
router.get('/events/edit/:id', auth.ensureAuthenticatedAdmin, eventController.editevent_get);
router.post('/events/edit', auth.ensureAuthenticatedAdmin, eventController.editevent_post);

module.exports = router;
