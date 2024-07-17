const Appointment = require('../models/Appointment');
const ResponseHelper = require('../utils/responseHelper');

exports.getAllAppointments = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const appointments = await Appointment.find({ userId }).populate('userId', 'name emailId');
    ResponseHelper.success(res, appointments);
  } catch (err) {
    ResponseHelper.error(res, 'Failed to fetch appointments');
    next(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const appointments = await Appointment.find({ userId }).populate('userId', 'name emailId');
    ResponseHelper.success(res, appointments);
  } catch (err) {
    ResponseHelper.error(res, 'Failed to fetch appointments');
    next(err);
  }
};

exports.getAppointmentById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const appointment = await Appointment.findOne({ _id: req.params.id, userId }).populate('userId', 'name emailId');
    if (!appointment) return ResponseHelper.notFound(res, 'Appointment not found');
    ResponseHelper.success(res, appointment);
  } catch (err) {
    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  const { title, date, startTime, endTime, status } = req.body;
  try {
    console.log(req.user)
    const userId = req.user.userId;
    const appointment = new Appointment({
      title,
      date,
      startTime,
      endTime,
      status,
      userId
    });
    await appointment.save();
    ResponseHelper.success(res, appointment, 'Appointment created successfully', 201);
  } catch (err) {
    next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  const { title, date, startTime, endTime, status } = req.body;
  try {
    const userId = req.user.userId;
    const appointment = await Appointment.findOne({ _id: req.params.id, userId });
    if (!appointment) return ResponseHelper.notFound(res, 'Appointment not found');

    appointment.title = title || appointment.title;
    appointment.date = date || appointment.date;
    appointment.startTime = startTime || appointment.startTime;
    appointment.endTime = endTime || appointment.endTime;
    appointment.status = status || appointment.status;

    await appointment.save();
    ResponseHelper.success(res, appointment, 'Appointment updated successfully');
  } catch (err) {
    next(err);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const appointment = await Appointment.findOne({ _id: req.params.id, userId });
    if (!appointment) return ResponseHelper.notFound(res, 'Appointment not found');
    await appointment.deleteOne();
    ResponseHelper.success(res, null, 'Appointment removed');
  } catch (err) {
    next(err);
  }
};
