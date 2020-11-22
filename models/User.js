const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  donations: [{
    type: Schema.Types.ObjectId,
    ref: 'Donation'
  }],

  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  noFed: {
    type: Number,
    default: 0
  },
  noDonations: {
    type: Number,
    default: 0
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  certificates: [{
    type: String
  }],
  profilePic: {
    type: String,
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=400"
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=50"

  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  donations: [{
    type: Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  history: [{
    color: String,
    icon: String,
    text: String
  }],
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification'
  }],
  unreadNotifications: {
    type: Boolean,
    default: false
  },
  unreadMessage: {
    type: Boolean,
    default: false
  },
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }]

});

userSchema.index({ location: "2dsphere" });

module.exports = User = mongoose.model("User", userSchema);
