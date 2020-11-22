const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/User");
const Notification = require("../models/Notification");
const isAuth = require("../middlewares/isAuth");
const isOrg = require("../middlewares/isOrg");
const { getOnlineUsers } = require("./utils");

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
router.get('/organisations', isAuth, async (req, res, next) => {
  try {
    const organisation = await User.find({ userType: 'organisation' }).select('name noFed contact address avatar _id')
    console.log('this is the organsaiton get ')
    console.log(organisation)
    res.json({
      'organisations': organisation
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})
router.get('/profile/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('name description contact address userType followers following noFed noDonations profilePic avatar location history posts donations').populate('posts donations')
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

router.get('/left-details', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('name avatar following followers donations').populate('following', 'name avatar').populate('followers', 'name avatar').populate('donations', 'title')
    if (user) {
      console.log(user)
      res.status(200).json(user)
    } else {
      const err = new Error('Profile does not exist!')
      err.statusCode = 404;
      throw err;
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
router.get('/follow/:id', isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { following } = await User.findById(req.userId);
    console.log("following", following)
    if (following.find(f => f == id)) {
      const err = new Error('You have already followed this user');
      err.statusCode = 403;
      throw err;
    }
    else if (id == req.userId) {
      const err = new Error('You cannot follow yourself');
      err.statusCode = 403;
      throw err;
    } else {

      const notification = new Notification({
        notificationType: "follow",
        user: req.userId,
      })
      const t = await notification.save()
      const not = await t.populate({
        path: 'user',
        select: 'avatar name'
      }).execPopulate()

      console.log("OKAAAYYYY")
      let user;
      let onlineUsers = getOnlineUsers();
      if (onlineUsers[id]) {
        user = await User.findByIdAndUpdate(id, { $push: { followers: req.userId, notifications: t } }, { new: true }).populate('donations posts')
        await User.findByIdAndUpdate(req.userId, { $push: { following: id } })
        console.log("user online")
        let receiverSocket = onlineUsers[id];
        receiverSocket.emit('notification', not);
      } else {
        user = await User.findByIdAndUpdate(id, { $push: { followers: req.userId, notifications: t }, $set: { unreadNotifications: true } }, { new: true }).populate('donations posts')
        await User.findByIdAndUpdate(req.userId, { $push: { following: id } })
        console.log("user not online", Object.keys(onlineUsers))
        //Set some unread thing
      }
      res.status(200).json(user)
    }

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

//UNFOLLOW A USER
//Can access requesting user's id throud through req.userId
router.get('/unfollow/:id', isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { following } = await User.findById(req.userId);
    if (!following.find(f => f == id)) {
      const err = new Error('You have not followed this user');
      err.statusCode = 403;
      throw err;
    }
    else if (id == req.userId) {
      const err = new Error('You cannot unfollow yourself');
      err.statusCode = 403;
      throw err;
    } else {
      const user = await User.findByIdAndUpdate(id, { $pull: { followers: req.userId } }, { new: true }).populate('donations posts')
      await User.findByIdAndUpdate(req.userId, { $pull: { following: id } })
      res.status(200).json(user)
    }

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
    const user = await User.findByIdAndUpdate(req.userId, req.body.user, { new: true }).populate('donations posts');
    res.status(200).json(user)

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

router.get('/followers/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('followers').populate('followers', 'name avatar description')
    console.log(user)
    const followers = user.followers;
    res.status(200).json(followers)

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

router.get('/following/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('following').populate('following', 'name avatar description')
    console.log(user)
    const following = user.following;
    res.status(200).json(following)

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
    const user = await User.findById(req.params.id).select('history')
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

router.post('/addfed', isAuth, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, { $inc: { noFed: req.body.value } }, { new: true }).populate('donations posts');
    res.status(200).json(user)

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})
router.post('/addhistory', isAuth, async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, { $push: { history: req.body.history } }, { new: true }).populate('donations posts');
    res.status(200).json(user)

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

router.post('/notifications', isAuth, async (req, res, next) => {
  try {
    const not = new Notification({
      notificationType: "follow",
      user: req.userId,
    })
    const t = await not.save()
    console.log(t)
    await User.findByIdAndUpdate(req.userId, { $push: { notifications: t } })
    res.json({ "yes": "no" })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

router.get('/read-notifications', isAuth, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.userId, { unreadNotifications: false })
    res.status(200).json({ "yes": "no" })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})

router.get('/read-messages', isAuth, async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.userId, { unreadMessages: false })
    res.status(200).json({ "yes": "no" })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})



router.get('/notifications', isAuth, async (req, res, next) => {
  try {
    const notifications = await User.findById(req.userId).select('notifications unreadNotifications unreadMessage').populate({
      path: 'notifications',

      populate: {
        path: 'user',
        model: 'User',
        select: 'name avatar'
      }
    }).slice('notifications', -5)
    res.json(notifications)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
})


module.exports = router;
