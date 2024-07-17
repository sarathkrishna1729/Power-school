// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ResponseHelper = require('../utils/responseHelper');

exports.register = async (req, res, next) => {
  const { name, emailId, password } = req.body;
  try {
    const userExists = await User.findOne({ emailId });
    if (userExists)
      if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, emailId, password });
    await user.save().then(()=>{
      ResponseHelper.success(res, 'User registered successfully');
    })

    
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      console.log(user, emailId)
      if (userExists) return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      if (userExists) return res.status(400).json({ message: 'Invalid credentials' });;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    ResponseHelper.success(res,{"token":token});
  } catch (err) {
    next(err);
  }
};
