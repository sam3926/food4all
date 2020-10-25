const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load User model
const User = require("../../models/User");
const isAuth = require("../../middlewares/isAuth");
const isOrg = require("../../middlewares/isOrg");


