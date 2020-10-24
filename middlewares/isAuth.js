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
        console.log("decodedToken", decodedToken)
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    req.userType = decodedToken.userType;
    next();
};