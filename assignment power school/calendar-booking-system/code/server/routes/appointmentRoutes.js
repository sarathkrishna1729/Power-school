// routes/appointmentRoutes.js
const express = require('express');
const { getAllAppointments, createAppointment, updateAppointment, deleteAppointment,getAppointmentById } = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllAppointments);
router.post('/', auth, createAppointment);
router.get('/:id', auth,getAppointmentById );
router.put('/:id', auth, updateAppointment);
router.delete('/:id', auth, deleteAppointment);

module.exports = router;
