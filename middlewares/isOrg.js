const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, keys.secretOrKey);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    if (decodedToken.userType != "organisation") {
        const error = new Error("Only Organisations allowed");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    req.userType = decodedToken.userType;
    next();
};