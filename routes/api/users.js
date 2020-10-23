const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load User model
const User = require("../../models/User");

router.post("/register", async (req, res, next) => {
  const { email, name, password, contact, description, address, userType, location } = req.body;
  console.log(req.body)
  console.log(location)
  const checkExistingUser = await User.findOne({ email: email })
  if (!checkExistingUser) {
    try {
      const hashedPw = await bcrypt.hash(password, 12);

      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        description: description,
        contact: contact,
        address: address,
        userType: userType,
        location: {
          type: "Point",
          coordinates: [location.lng, location.lat]
        }
      });
      const result = await user.save();
      console.log("result", result)
      res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    }
  }
  else {
    const err = new Error('User already exists');
    err.statusCode = 401;
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      const err = new Error('A User with this email could not be found')
      err.statusCode = 401;
      throw err;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const err = new Error('Wrong Password');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign({
      email: user.email,
      userId: user.id,
      userType: user.userType
    },
      keys.secretOrKey,
      {
        expiresIn: 31556926 // 1 year in seconds
      }
    );

    res.status(200).json({
      success: true,
      token: token
    })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);
  }

})

module.exports = router;
