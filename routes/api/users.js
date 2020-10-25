const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load User model
const User = require("../../models/User");
const isAuth = require("../../middlewares/isAuth");
const isOrg = require("../../middlewares/isOrg");

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
        location: location
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


router.get('/profile/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('name description contact address userType followers following noFed noDonations profilePic location')
    if (user) {
      console.log(user)
      res.status(200).json(user)
    }
    else {
      const err = new Error('Profile does not exist!')
      err.statusCode = 404;
      throw err
    }

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//TODOS

//FOLLOW A USER
//Can access requesting user's id throud through req.userId
router.post('/follow/:id', isAuth, async (req, res, next) => {
  try {


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//EDIT PROFILE
//Access id only through req.userId, for protection, so other's can't access
//pass the fields in req.body, find userby id and update those fields only
//Editing should have name, contact, description, address ,location only
router.post('/edit-profile', isAuth, async (req, res, next) => {
  try {


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//CHANGE PROFILE PIC

router.post('/change-pic', isAuth, async (req, res, next) => {
  try {

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})


//FETCH USER's donations
//User's id in route since public , anyone can see
router.get('/donations/:id', isAuth, async (req, res, next) => {
  try {


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//FETCH USER's posts
router.get('/posts/:id', isAuth, async (req, res, next) => {
  try {


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//FETCH user's history/timeline
router.get('/history/:id', isAuth, async (req, res, next) => {
  try {


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//FETCH Suggested pages to be shown in the profile page
router.get('/suggested-pages', isAuth, async (req, res, next) => {
  try {


  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//Display all the pending donation
router.get('/pending-donations', isAuth, async (req, res, next) => {
  try {

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//Only Organisations
//Change the status of a pending donation to either accepted or rejected
//Also take the feedback in the body
router.post('/pending-donations/:id', isOrg, async (req, res, next) => {
  try {

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})


module.exports = router;
