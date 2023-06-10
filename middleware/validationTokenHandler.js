const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validation = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        console.log('decode', token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error('User is not autherized');
            }
            console.log('decode', decode);
            req.user = decode.user;
            next();
            if (!token) {
                res.status(401);
                throw new Error('User is not autherized/token missing');
            }
        });
    }
});

module.exports = { validation };
